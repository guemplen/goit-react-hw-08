import { createSelector } from '@reduxjs/toolkit';

export const selectAllContacts = state => state.contacts.items;
export const selectContactsError = state => state.contacts.error;
export const selectContactsLoading = state => state.contacts.loading;

export const selectFilteredContacts = createSelector(
  [selectAllContacts, state => state.filters.name],
  (contacts, filter) =>
    contacts.filter(
      contact =>
        contact.name?.toLowerCase().includes(filter.toLowerCase()) ||
        contact.phone?.toLowerCase().includes(filter.toLowerCase())
    )
);
