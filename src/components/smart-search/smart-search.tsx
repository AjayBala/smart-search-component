import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'smart-search',
  styleUrl: 'smart-search.css',
  shadow: true,
})
export class SmartSearch {
  @State() users: Array<{ id: number; name: string }> = [];
  @State() filteredUsers: Array<{ id: number; name: string }> = [];
  @State() searchTerm: string = '';
  @State() showResults: boolean = false;
  @State() highlightedIndex: number = -1;

  // unique ids for ARIA
  private hostId = 'smart-search-' + Math.random().toString(36).slice(2, 9);

  fakeData = [
    { id: 1, name: 'Sam' },
    { id: 2, name: 'Daniel' },
    { id: 3, name: 'Sonali Goyal' },
    { id: 4, name: 'John Doe' },
    { id: 5, name: 'Jane Smith' },
    { id: 6, name: 'Frank Miller' },
  ];

  componentWillLoad() {
    this.users = this.fakeData;
    this.filteredUsers = this.fakeData;
  }

  // plain input handler — input is NOT a dropdown
 handleInput = (event: Event) => {
  const input = (event.target as HTMLInputElement).value;
  this.searchTerm = input;
  const lower = input.toLowerCase();
  this.filteredUsers = this.users.filter(user =>
    user.name.toLowerCase().includes(lower)
  );
  // show dropdown even if there are no results
  this.showResults = input.length > 0;
  this.highlightedIndex = -1;
};


  clearSearch = () => {
    this.searchTerm = '';
    this.filteredUsers = this.users;
    this.showResults = false;
    this.highlightedIndex = -1;
  };

  // keyboard navigation when the results dropdown is open
  handleKeyDown = (event: KeyboardEvent) => {
    if (!this.showResults || this.filteredUsers.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightedIndex =
          (this.highlightedIndex + 1) % this.filteredUsers.length;
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex =
          (this.highlightedIndex - 1 + this.filteredUsers.length) %
          this.filteredUsers.length;
        break;

      case 'Enter':
        event.preventDefault();
        if (this.highlightedIndex >= 0) {
          this.selectUser(this.filteredUsers[this.highlightedIndex]);
        } else if (this.filteredUsers.length === 1) {
          // if only one result and nothing highlighted, select it
          this.selectUser(this.filteredUsers[0]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.showResults = false;
        this.highlightedIndex = -1;
        break;
    }
  };

  // select (either mouse click or keyboard)
  selectUser = (user: { id: number; name: string }) => {
    this.searchTerm = user.name;
    this.showResults = false;
    this.highlightedIndex = -1;
    // you could emit an event here if parent components need selection notifications
    // this.hostEl.dispatchEvent(new CustomEvent('userSelected', { detail: user }));
  };

  // close results if focus left component entirely
  onFocusOut = (ev: FocusEvent) => {
    // relatedTarget can be null (e.g., clicking outside)
    const related = ev.relatedTarget as HTMLElement | null;
    const root = (ev.currentTarget as HTMLElement);
    // if focus moved outside the component, hide results
    if (!related || !root.contains(related)) {
      this.showResults = false;
      this.highlightedIndex = -1;
    }
  };

  render() {
    const listboxId = `${this.hostId}-listbox`;

    return (
      <div
        class="search-container"
        onFocusout={this.onFocusOut}
      >
        <label class="visually-hidden" htmlFor={`${this.hostId}-input`}>
          Search users
        </label>

        <div class="search-box">
          <input
            id={`${this.hostId}-input`}
            type="text"
            placeholder="Search user..."
            value={this.searchTerm}
            onInput={this.handleInput}
            onKeyDown={this.handleKeyDown}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded={this.showResults ? 'true' : 'false'}
            aria-activedescendant={
              this.highlightedIndex >= 0
                ? `${this.hostId}-option-${this.highlightedIndex}`
                : undefined
            }
          />

          {this.searchTerm && (
            <button
              class="clear-btn"
              onClick={this.clearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* RESULTS DROPDOWN (only shows the results) */}
   {this.showResults && (
  <ul
    id={listboxId}
    role="listbox"
    class="results-dropdown"
    aria-label="Search results"
  >
    {this.filteredUsers.length > 0 ? (
      this.filteredUsers.map((user, index) => (
        <li
          id={`${this.hostId}-option-${index}`}
          role="option"
          aria-selected={index === this.highlightedIndex ? 'true' : 'false'}
          class={{
            'result-item': true,
            'highlighted': index === this.highlightedIndex,
          }}
          onMouseEnter={() => (this.highlightedIndex = index)}
          onMouseDown={() => this.selectUser(user)}
        >
          {user.name}
        </li>
      ))
    ) : (
      <li class="no-results">No results found</li>
    )}
  </ul>
)}


      </div>
    );
  }
}
