import React from 'react';
import s from './filter.module.css';

export default function Filter({ value, onHandleFilter }) {
  return (
    <>
      <h2>Contacts</h2>
      <label className={s.filter}>
        Find contacts by name
        <input type="text" value={value} onChange={onHandleFilter} />
      </label>
    </>
  );
}
