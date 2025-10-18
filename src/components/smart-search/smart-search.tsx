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

  // fake JSON data
  fakeData = [
    { id: 1, name: 'Sam' },
    { id: 2, name: 'Antony' },
    { id: 3, name: 'Sonali Goyal' },
    { id: 4, name: 'John Doe' },
    { id: 5, name: 'Jane Smith' },
    { id: 6, name: 'Frank Miller' },
  ];

  componentWillLoad() {
    this.users = this.fakeData;
    this.filteredUsers = this.fakeData;
  }

  handleInput = (event: Event) => {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = input;
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(input)
    );
  };

  render() {
    return (
      <div class="search-container">
        <input
          type="text"
          placeholder="Search user..."
          value={this.searchTerm}
          onInput={this.handleInput}
        />
        
        <ul>
          {this.filteredUsers.map(user => (
            <li>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
