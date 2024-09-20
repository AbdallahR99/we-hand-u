import { injectBaseURL, injectRequest } from '@analogjs/router/tokens';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div>
      <a href="https://analogjs.org/" target="_blank">
        <img alt="Analog Logo" class="logo analog" src="/analog.svg" />
      </a>
    </div>

    <h2>Analog</h2>
    <!-- {{ request | json }} -->
    <h3>The fullstack meta-framework for Angular!</h3>

    <div class="card">
      <button type="button" (click)="increment()">Count {{ count() }}</button>
    </div>

    <p class="read-the-docs">
      <a href="https://analogjs.org" target="_blank">Docs</a> |
      <a href="https://github.com/analogjs/analog" target="_blank">GitHub</a> |
      <a href="https://github.com/sponsors/brandonroberts" target="_blank"
        >Sponsor</a
      >
    </p>
  `,
  styles: [
    `
      .logo {
        will-change: filter;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
      .read-the-docs > * {
        color: #fff;
      }
    `,
  ],
  imports: [CommonModule],
})
export default class HomeComponent {
  count = signal(0);
  request = injectBaseURL();
  increment() {
    console.log(this.request);

    this.count.update((count) => count + 1);
  }
}
