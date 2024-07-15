import { useState } from 'react';
import Item from './Item';
import Button from './Button';

export default function PackList({
  items,
  hanldeDeleteItems,
  hanldeToggleItem,
  handleClearItems,
}) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;
  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            hanldeDeleteItems={hanldeDeleteItems}
            hanldeToggleItem={hanldeToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <Button bgColor="tomato" textColor="#fff" onClick={handleClearItems}>
          Clear list 🗑️
        </Button>
      </div>
    </div>
  );
}
