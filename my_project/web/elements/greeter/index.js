/**
 * greeter/index.js
 * Custom element <my-greeter> — wraps the `greet` function from the Refract registry.
 *
 * Extends AutoFunctionController (Layer 2 of the Refract SDK) to provide
 * a custom dark-themed UI while reusing all the state management, validation,
 * and HTTP communication logic.
 *
 * Usage in HTML:
 *   <script type="module" src="/static/elements/greeter/index.js"></script>
 *   <my-greeter></my-greeter>
 */

import { css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { AutoFunctionController } from '/refract/controller.js';

export class MyGreeter extends AutoFunctionController {

    static styles = css`
        :host {
            display: block;
            font-family: 'Inter', system-ui, sans-serif;
        }

        .card {
            background: #1a1d27;
            border: 1px solid #2a2d3e;
            border-radius: 12px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }

        .card-title {
            font-size: 1rem;
            font-weight: 700;
            color: #e2e8f0;
            margin: 0;
            letter-spacing: -0.02em;
        }

        .card-desc {
            font-size: 0.8rem;
            color: #64748b;
            margin: 0;
        }

        .input-row {
            display: flex;
            gap: 0.6rem;
            align-items: stretch;
        }

        input[type="text"] {
            flex: 1;
            background: #0f1117;
            border: 1px solid #2a2d3e;
            border-radius: 8px;
            padding: 0.55rem 0.9rem;
            font-size: 0.9rem;
            color: #e2e8f0;
            font-family: inherit;
            outline: none;
            transition: border-color 0.15s;
        }

        input[type="text"]:focus {
            border-color: #6c63ff;
            box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.15);
        }

        input[type="text"]::placeholder {
            color: #64748b;
        }

        button {
            background: #6c63ff;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 0.55rem 1.2rem;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            font-family: inherit;
            transition: opacity 0.15s, transform 0.1s;
            white-space: nowrap;
        }

        button:hover:not(:disabled) {
            opacity: 0.85;
            transform: translateY(-1px);
        }

        button:active:not(:disabled) {
            transform: translateY(0);
        }

        button:disabled {
            opacity: 0.45;
            cursor: not-allowed;
        }

        .result {
            background: rgba(108, 99, 255, 0.08);
            border: 1px solid rgba(108, 99, 255, 0.25);
            border-radius: 8px;
            padding: 0.75rem 1rem;
            font-size: 1rem;
            color: #a78bfa;
            font-weight: 500;
            animation: fadeIn 0.2s ease;
        }

        .result-error {
            background: rgba(239, 68, 68, 0.08);
            border-color: rgba(239, 68, 68, 0.3);
            color: #f87171;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to   { opacity: 1; transform: translateY(0); }
        }
    `;

    constructor() {
        super();
        // Target the `greet` function from the Refract registry
        this.funcName = 'greet';
    }

    render() {
        const nameValue = this.params['name'] ?? 'World';
        const isError = this.result?._isError;

        return html`
            <div class="card">
                <div class="card-header">
                    <span>👋</span>
                    <div>
                        <p class="card-title">Greeter</p>
                        <p class="card-desc">Calls the <code>greet</code> function via the Refract API</p>
                    </div>
                </div>

                <div class="input-row">
                    <input
                        type="text"
                        placeholder="Enter a name…"
                        .value=${nameValue}
                        @input=${e => this.setParam('name', e.target.value)}
                        @keydown=${e => e.key === 'Enter' && this.execute()}
                    />
                    <button ?disabled=${this._isExecuting} @click=${this.execute}>
                        ${this._isExecuting ? '…' : 'Greet ✨'}
                    </button>
                </div>

                ${this.result !== null ? html`
                    <div class="result ${isError ? 'result-error' : ''}">
                        ${isError
                            ? this.result._message
                            : (this.result?.message ?? JSON.stringify(this.result))}
                    </div>
                ` : ''}
            </div>
        `;
    }
}

if (!customElements.get('my-greeter')) {
    customElements.define('my-greeter', MyGreeter);
}
