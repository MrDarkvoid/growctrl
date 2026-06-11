#==============================================================================
# GROWCTRL Integration – todo
# Zweck   : Aufgabenliste je Zelt (persistiert via Store). Phasen-Empfehlungen
#           der Stationen landen automatisch (dedupliziert) als offene Aufgabe.
# Version : 2.2.0-dev | Lizenz: MIT
# Autor   : MrDarkvoid – entwickelt in Zusammenarbeit mit Claude (Anthropic), Vibe Coding
#==============================================================================

from __future__ import annotations

import uuid

from homeassistant.components.todo import (
    TodoItem, TodoItemStatus, TodoListEntity, TodoListEntityFeature,
)
from homeassistant.helpers.storage import Store

from .const import DOMAIN
from .entity import GrowctrlEntity
from .runtime import TentRuntime


async def async_setup_entry(hass, entry, async_add_entities):
    rt = hass.data[DOMAIN][entry.entry_id]
    if not isinstance(rt, TentRuntime):
        return
    ent = TentTodo(hass, entry.entry_id, rt)
    await ent.async_load()
    async_add_entities([ent])


class TentTodo(GrowctrlEntity, TodoListEntity):
    _attr_supported_features = (
        TodoListEntityFeature.CREATE_TODO_ITEM
        | TodoListEntityFeature.UPDATE_TODO_ITEM
        | TodoListEntityFeature.DELETE_TODO_ITEM
    )

    def __init__(self, hass, entry_id, rt: TentRuntime):
        super().__init__(entry_id, rt, "todo", "Aufgaben")
        self._store: Store = Store(hass, 1, f"{DOMAIN}_todo_{rt.slug}")
        self._items: list[TodoItem] = []
        rt.todo_add = self._auto_add

    async def async_load(self) -> None:
        raw = await self._store.async_load() or []
        self._items = [TodoItem(summary=i["summary"], uid=i["uid"],
                                status=TodoItemStatus(i["status"])) for i in raw]

    async def _save(self) -> None:
        await self._store.async_save([
            {"summary": i.summary, "uid": i.uid, "status": i.status.value}
            for i in self._items])
        self.async_write_ha_state()

    def _auto_add(self, summary: str) -> None:
        """Automatischer Eintrag (z.B. Phasen-Empfehlung), dedupliziert ueber Summary."""
        if any(i.summary == summary and i.status == TodoItemStatus.NEEDS_ACTION
               for i in self._items):
            return
        self._items.append(TodoItem(summary=summary, uid=uuid.uuid4().hex,
                                    status=TodoItemStatus.NEEDS_ACTION))
        self.hass.async_create_task(self._save())

    @property
    def todo_items(self) -> list[TodoItem]:
        return self._items

    async def async_create_todo_item(self, item: TodoItem) -> None:
        self._items.append(TodoItem(summary=item.summary, uid=uuid.uuid4().hex,
                                    status=TodoItemStatus.NEEDS_ACTION))
        await self._save()

    async def async_update_todo_item(self, item: TodoItem) -> None:
        for idx, ex in enumerate(self._items):
            if ex.uid == item.uid:
                self._items[idx] = item
        await self._save()

    async def async_delete_todo_items(self, uids: list[str]) -> None:
        self._items = [i for i in self._items if i.uid not in uids]
        await self._save()
