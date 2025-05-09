"use client";

import { useState } from 'react';
import { RoadmapItem as RoadmapItemType, Priority, Status, Quarter } from '../types/roadmap';
import styles from './RoadmapItem.module.css';

interface RoadmapItemProps {
  item: RoadmapItemType;
  onUpdate: (updatedItem: RoadmapItemType) => void;
  onDelete: (id: string) => void;
}

export default function RoadmapItem({ item, onUpdate, onDelete }: RoadmapItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);

  const handleSave = () => {
    onUpdate({
      ...editedItem,
      updatedAt: new Date()
    });
    setIsEditing(false);
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'High': return '#ff4d4f';
      case 'Medium': return '#faad14';
      case 'Low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'Not Started': return '#d9d9d9';
      case 'In Progress': return '#1890ff';
      case 'Completed': return '#52c41a';
      case 'On Hold': return '#faad14';
      default: return '#d9d9d9';
    }
  };

  if (isEditing) {
    return (
      <div className={styles.item}>
        <div className={styles.editForm}>
          <input
            type="text"
            value={editedItem.title}
            onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
            placeholder="Title"
            className={styles.input}
          />
          <textarea
            value={editedItem.description}
            onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
            placeholder="Description"
            className={styles.textarea}
          />
          <div className={styles.selects}>
            <select
              value={editedItem.priority}
              onChange={(e) => setEditedItem({ ...editedItem, priority: e.target.value as Priority })}
              className={styles.select}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              value={editedItem.status}
              onChange={(e) => setEditedItem({ ...editedItem, status: e.target.value as Status })}
              className={styles.select}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
            <select
              value={editedItem.quarter}
              onChange={(e) => setEditedItem({ ...editedItem, quarter: e.target.value as Quarter })}
              className={styles.select}
            >
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
            <input
              type="number"
              value={editedItem.year}
              onChange={(e) => setEditedItem({ ...editedItem, year: parseInt(e.target.value) })}
              className={styles.input}
              placeholder="Year"
            />
          </div>
          <div className={styles.buttons}>
            <button onClick={handleSave} className={styles.saveButton}>Save</button>
            <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <h3 className={styles.title}>{item.title}</h3>
        <div className={styles.badges}>
          <span 
            className={styles.badge}
            style={{ backgroundColor: getPriorityColor(item.priority) }}
          >
            {item.priority}
          </span>
          <span 
            className={styles.badge}
            style={{ backgroundColor: getStatusColor(item.status) }}
          >
            {item.status}
          </span>
          <span className={styles.badge}>{item.quarter} {item.year}</span>
        </div>
      </div>
      <p className={styles.description}>{item.description}</p>
      <div className={styles.footer}>
        <div className={styles.progress}>
          <div 
            className={styles.progressBar}
            style={{ width: `${item.progress}%` }}
          />
          <span>{item.progress}%</span>
        </div>
        <div className={styles.actions}>
          <button onClick={() => setIsEditing(true)} className={styles.editButton}>
            Edit
          </button>
          <button onClick={() => onDelete(item.id)} className={styles.deleteButton}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 