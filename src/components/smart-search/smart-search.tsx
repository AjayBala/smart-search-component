import { Component, h, Prop, State, Watch } from '@stencil/core';
import { faker } from '@faker-js/faker';

@Component({
  tag: 'smart-search',
  styleUrl: 'smart-search.css',
  shadow: true,
})
export class SmartSearch {
  @State() users: Array<{ id: number; name: string; bank?: string; account?: string; balance?: string }> = [];
  @State() filteredUsers: Array<{ id: number; name: string; bank?: string; account?: string; balance?: string }> = [];
  @State() searchTerm: string = '';
  @State() showResults: boolean = false;
  @State() highlightedIndex: number = -1;
  @State() isLoading: boolean = false;

  @Prop({ reflect: true }) theme: 'light' | 'dark' | 'auto' = 'auto';

  @Watch('theme')
  handleThemeChange(newValue: string) {
    console.log(`Theme changed to: ${newValue}`);
  }
  private hostId = 'smart-search-' + Math.random().toString(36).slice(2, 9);

  fakeData = Array.from({ length: 20 }, () => ({
    id: faker.number.int({ min: 1000, max: 9999 }),
    name: faker.person.fullName(),
    bank: faker.company.name(),
    account: faker.finance.accountNumber(8),
    balance: faker.finance.amount({ min: 1000, max: 100000, dec: 2, symbol: '$' })
  }));

  componentWillLoad() {
    this.users = this.fakeData;
    this.filteredUsers = this.fakeData;
  }

  handleInput = (event: Event) => {
    const input = (event.target as HTMLInputElement).value;
    this.searchTerm = input;
    const lower = input.toLowerCase().replace(/\s|-/g, '');

    if (!input.trim()) {
      this.showResults = false;
      this.filteredUsers = [];
      return;
    }

    this.isLoading = true;


    setTimeout(() => {
      this.filteredUsers = this.users.filter((user) => {
        const normalizedAccount = user.account?.toLowerCase().replace(/\s|-/g, '') || '';
        const normalizedId = user.id.toString();
        return (
          user.name.toLowerCase().includes(lower) ||
          user.bank.toLowerCase().includes(lower) ||
          normalizedAccount.includes(lower) ||
          normalizedId.includes(lower)
        );
      });

      this.showResults = true;
      this.highlightedIndex = -1;
      this.isLoading = false;
    }, 500);
  };

  clearSearch = () => {
    this.searchTerm = '';
    this.filteredUsers = this.users;
    this.showResults = false;
    this.highlightedIndex = -1;
  };

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

  selectUser = (user: any) => {
    this.searchTerm = `${user.name} (${user.account})`;
    this.showResults = false;
    this.highlightedIndex = -1;
  };

  onFocusOut = (ev: FocusEvent) => {
    const related = ev.relatedTarget as HTMLElement | null;
    const root = ev.currentTarget as HTMLElement;
    if (!related || !root.contains(related)) {
      this.showResults = false;
      this.highlightedIndex = -1;
    }
  };

  renderDropdown() {
    if (!this.showResults && !this.isLoading) return null;

    const listboxId = `${this.hostId}-listbox`;

    return (
      <div class="dropdown-container">
        <label class="dropdown-label" htmlFor={listboxId}>
          {this.isLoading
            ? 'Searching...'
            : this.filteredUsers.length > 0
            ? `${this.filteredUsers.length} result${this.filteredUsers.length > 1 ? 's' : ''} found`
            : 'No results found'}
        </label>

        <div id={listboxId} role="listbox" class="dropdown" aria-label="Search results">
          {this.isLoading ? (
            <div class="loading-text">Please wait...</div>
          ) : this.filteredUsers.length > 0 ? (
            this.filteredUsers.map((user, index) => (
              <div
                id={`${this.hostId}-option-${index}`}
                role="option"
                aria-selected={index === this.highlightedIndex ? 'true' : 'false'}
                class={{
                  'dropdown-item': true,
                  'active': index === this.highlightedIndex,
                }}
                onMouseEnter={() => (this.highlightedIndex = index)}
                onMouseDown={() => this.selectUser(user)}
              >
                <strong>{user.name}</strong> — {user.bank}
                <br />
                <small>
                  ID: {user.id} | Acc#: {user.account} | Balance: {user.balance}
                </small>
              </div>
            ))
          ) : (
            <div class="no-results">No results found</div>
          )}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div class="search-container" onFocusout={this.onFocusOut}>
        <label class="input-label" htmlFor={`${this.hostId}-input`}>
          Search Bank Accounts
        </label>

        <div class="search-box">
          <input
            id={`${this.hostId}-input`}
            type="text"
            placeholder="Search by ID, Name, Bank, or Account..."
            value={this.searchTerm}
            onInput={this.handleInput}
            onKeyDown={this.handleKeyDown}
            aria-autocomplete="list"
            aria-controls={`${this.hostId}-listbox`}
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

        {!this.searchTerm && !this.isLoading && (
          <div class="search-hint">Start typing to search bank accounts</div>
        )}

        {this.renderDropdown()}
      </div>
    );
  }
}
