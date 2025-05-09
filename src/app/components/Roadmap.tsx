"use client";

import { useState, useMemo } from 'react';
import { RoadmapItem as RoadmapItemType, RoadmapFilter } from '../types/roadmap';
import RoadmapItem from './RoadmapItem';
import GanttChart from './GanttChart';
import styles from './Roadmap.module.css';

interface RoadmapProps {
  initialItems?: RoadmapItemType[];
}

export default function Roadmap({ initialItems = [] }: RoadmapProps) {
  const [items, setItems] = useState<RoadmapItemType[]>(initialItems);
  const [filters, setFilters] = useState<RoadmapFilter>({});
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'gantt'>('list');
  const [newItem, setNewItem] = useState<Partial<RoadmapItemType>>({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Not Started',
    quarter: 'Q1',
    year: new Date().getFullYear(),
    owner: '',
    effort: 0,
    progress: 0
  });

  const handleAdd = () => {
    const item: RoadmapItemType = {
      ...newItem as RoadmapItemType,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setItems([...items, item]);
    setIsAdding(false);
    setNewItem({
      title: '',
      description: '',
      priority: 'Medium',
      status: 'Not Started',
      quarter: 'Q1',
      year: new Date().getFullYear(),
      owner: '',
      effort: 0,
      progress: 0
    });
  };

  const handleUpdate = (updatedItem: RoadmapItemType) => {
    setItems(items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (filters.priority && item.priority !== filters.priority) return false;
      if (filters.status && item.status !== filters.status) return false;
      if (filters.quarter && item.quarter !== filters.quarter) return false;
      if (filters.year && item.year !== filters.year) return false;
      if (filters.owner && item.owner !== filters.owner) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.owner.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [items, filters, searchQuery]);

  const groupedItems = useMemo(() => {
    const groups: { [key: string]: RoadmapItemType[] } = {};
    filteredItems.forEach(item => {
      const key = `${item.year} ${item.quarter}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });
    return groups;
  }, [filteredItems]);

  const totalProgress = useMemo(() => {
    if (items.length === 0) return 0;
    const total = items.reduce((sum, item) => sum + item.progress, 0);
    return Math.round(total / items.length);
  }, [items]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Product Roadmap</h1>
          <div className={styles.progress}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <span className={styles.progressText}>Overall Progress: {totalProgress}%</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
            <button
              className={`${styles.viewButton} ${viewMode === 'gantt' ? styles.active : ''}`}
              onClick={() => setViewMode('gantt')}
            >
              Gantt View
            </button>
          </div>
          <button 
            className={styles.addButton}
            onClick={() => setIsAdding(true)}
          >
            Add Item
          </button>
        </div>
      </div>

      <div className={styles.searchAndFilters}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search items..."
          className={styles.searchInput}
        />
        <div className={styles.filters}>
          <select
            value={filters.priority || ''}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value as any })}
            className={styles.filter}
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={filters.status || ''}
            onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
            className={styles.filter}
          >
            <option value="">All Statuses</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
          <select
            value={filters.quarter || ''}
            onChange={(e) => setFilters({ ...filters, quarter: e.target.value as any })}
            className={styles.filter}
          >
            <option value="">All Quarters</option>
            <option value="Q1">Q1</option>
            <option value="Q2">Q2</option>
            <option value="Q3">Q3</option>
            <option value="Q4">Q4</option>
          </select>
          <input
            type="number"
            value={filters.year || ''}
            onChange={(e) => setFilters({ ...filters, year: parseInt(e.target.value) })}
            placeholder="Year"
            className={styles.filter}
          />
        </div>
      </div>

      {isAdding && (
        <div className={styles.addForm}>
          <h2>Add New Item</h2>
          <input
            type="text"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            placeholder="Title"
            className={styles.input}
          />
          <textarea
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            placeholder="Description"
            className={styles.textarea}
          />
          <div className={styles.formGrid}>
            <select
              value={newItem.priority}
              onChange={(e) => setNewItem({ ...newItem, priority: e.target.value as any })}
              className={styles.select}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={newItem.status}
              onChange={(e) => setNewItem({ ...newItem, status: e.target.value as any })}
              className={styles.select}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
            <select
              value={newItem.quarter}
              onChange={(e) => setNewItem({ ...newItem, quarter: e.target.value as any })}
              className={styles.select}
            >
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
            <input
              type="number"
              value={newItem.year}
              onChange={(e) => setNewItem({ ...newItem, year: parseInt(e.target.value) })}
              placeholder="Year"
              className={styles.input}
            />
            <input
              type="text"
              value={newItem.owner}
              onChange={(e) => setNewItem({ ...newItem, owner: e.target.value })}
              placeholder="Owner"
              className={styles.input}
            />
            <input
              type="number"
              value={newItem.effort}
              onChange={(e) => setNewItem({ ...newItem, effort: parseInt(e.target.value) })}
              placeholder="Effort (story points)"
              className={styles.input}
            />
          </div>
          <div className={styles.formButtons}>
            <button onClick={handleAdd} className={styles.saveButton}>Add Item</button>
            <button onClick={() => setIsAdding(false)} className={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {viewMode === 'list' ? (
        <div className={styles.items}>
          {Object.entries(groupedItems).map(([quarter, items]) => (
            <div key={quarter} className={styles.quarterGroup}>
              <h2 className={styles.quarterTitle}>{quarter}</h2>
              {items.map(item => (
                <RoadmapItem
                  key={item.id}
                  item={item}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <GanttChart items={filteredItems} onUpdate={handleUpdate} />
      )}
    </div>
  );
} 