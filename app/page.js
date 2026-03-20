export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', system-ui, -apple-system, sans-serif; }

        .canvas-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #7b2d8e 0%, #4a1a6b 20%, #2d1b69 40%, #1a1a5e 60%, #2d4a7b 80%, #4a7b9b 100%);
          padding: 24px;
        }

        .canvas-title {
          text-align: center;
          color: #ffffff;
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 20px;
          letter-spacing: 0.5px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas:
            "biz role context"
            "tasks reasoning tooling"
            "memory reasoning interaction";
          gap: 16px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .card-biz { grid-area: biz; }
        .card-role { grid-area: role; }
        .card-context { grid-area: context; }
        .card-tasks { grid-area: tasks; }
        .card-tooling { grid-area: tooling; }
        .card-memory { grid-area: memory; }
        .card-interaction { grid-area: interaction; }

        .card {
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .card-header {
          padding: 10px 16px;
          color: #ffffff;
          font-size: 15px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-header .num {
          background: rgba(255,255,255,0.3);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          flex-shrink: 0;
        }

        .card-body {
          padding: 14px 16px;
          font-size: 12.5px;
          color: #333;
          line-height: 1.55;
        }

        .card-body h3 {
          font-size: 13px;
          font-weight: 700;
          color: #222;
          margin-bottom: 8px;
        }

        .card-body ul {
          padding-left: 16px;
          margin-bottom: 8px;
        }

        .card-body ul li {
          margin-bottom: 3px;
        }

        .card-body ul li::marker {
          color: #666;
        }

        .example-box {
          background: #fff8e1;
          border-left: 3px solid #f9a825;
          padding: 8px 10px;
          margin-top: 10px;
          border-radius: 0 4px 4px 0;
          font-size: 11.5px;
        }

        .example-box strong {
          font-size: 12px;
          color: #e65100;
          display: block;
          margin-bottom: 4px;
        }

        /* Header colors */
        .header-red { background: linear-gradient(90deg, #e53935, #ef5350); }
        .header-purple { background: linear-gradient(90deg, #7b1fa2, #9c27b0); }
        .header-green { background: linear-gradient(90deg, #2e7d32, #43a047); }
        .header-teal { background: linear-gradient(90deg, #00695c, #00897b); }
        .header-orange { background: linear-gradient(90deg, #e65100, #f57c00); }
        .header-blue { background: linear-gradient(90deg, #0277bd, #0288d1); }

        /* Center reasoning card */
        .reasoning-card {
          grid-area: reasoning;
          background: #fffde7;
          border: 2px solid #f9a825;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }

        .reasoning-title {
          text-align: center;
          font-size: 18px;
          font-weight: 800;
          color: #333;
          margin-bottom: 14px;
        }

        .goal-circle-container {
          display: flex;
          justify-content: center;
          margin: 16px 0;
        }

        .goal-circle {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .goal-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #1565c0, #0d47a1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 16px;
          z-index: 2;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .goal-segment {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 11px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .seg-plan { background: linear-gradient(135deg, #43a047, #2e7d32); top: 0; left: 50%; transform: translateX(-50%); }
        .seg-execute { background: linear-gradient(135deg, #f9a825, #f57f17); top: 50%; right: 0; transform: translateY(-50%); }
        .seg-refine { background: linear-gradient(135deg, #e53935, #c62828); bottom: 0; left: 50%; transform: translateX(-50%); }
        .seg-reflect { background: linear-gradient(135deg, #7b1fa2, #6a1b9a); top: 50%; left: 0; transform: translateY(-50%); }

        .arrow-labels {
          display: flex;
          justify-content: space-around;
          margin-top: 8px;
          font-size: 11px;
          color: #555;
          font-weight: 600;
        }

        .reasoning-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 14px;
          font-size: 11.5px;
        }

        .reasoning-columns h4 {
          font-size: 12px;
          font-weight: 700;
          color: #444;
          margin-bottom: 6px;
        }

        .reasoning-columns ul {
          padding-left: 14px;
          color: #555;
        }

        .reasoning-columns li {
          margin-bottom: 2px;
        }

        .arch-patterns {
          margin-top: 14px;
          font-size: 11.5px;
          color: #555;
          text-align: center;
        }

        .arch-patterns strong {
          color: #333;
        }

        .flow-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 8px;
          font-size: 11.5px;
          color: #666;
          font-weight: 600;
        }

        .flow-arrow span { color: #f57c00; }

        .sub-section {
          margin-top: 8px;
        }

        .sub-section-title {
          font-size: 12px;
          font-weight: 700;
          color: #00695c;
          margin-bottom: 4px;
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .two-col-section h4 {
          font-size: 11.5px;
          font-weight: 700;
          color: #00695c;
          margin-bottom: 4px;
        }

        .two-col-section ul {
          padding-left: 14px;
          font-size: 11.5px;
        }

        .tooltip-box {
          background: #fff9c4;
          border: 1px solid #f9a825;
          border-radius: 6px;
          padding: 6px 8px;
          font-size: 10.5px;
          color: #555;
          margin-top: 6px;
          font-style: italic;
        }

        .agent-badge {
          display: inline-block;
          background: #e8eaf6;
          border: 1px solid #7986cb;
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 10.5px;
          font-weight: 600;
          color: #3949ab;
          margin: 2px 2px;
        }

        .key-questions {
          background: #e0f2f1;
          border-radius: 4px;
          padding: 8px 10px;
          margin-top: 8px;
        }

        .key-questions h4 {
          font-size: 11.5px;
          font-weight: 700;
          color: #00695c;
          margin-bottom: 4px;
        }

        .context-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .memory-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 6px;
        }

        .memory-col h4 {
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .memory-col.short h4 { color: #e65100; }
        .memory-col.persistent h4 { color: #00695c; }

        .memory-col ul {
          padding-left: 14px;
          font-size: 11.5px;
        }

        .interaction-types {
          margin-top: 8px;
          background: #f3e5f5;
          border-radius: 4px;
          padding: 8px 10px;
        }

        .interaction-types h4 {
          font-size: 11.5px;
          font-weight: 700;
          color: #6a1b9a;
          margin-bottom: 4px;
        }

        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "biz"
              "role"
              "context"
              "tasks"
              "reasoning"
              "tooling"
              "memory"
              "interaction";
          }
        }
      `}</style>

      <div className="canvas-wrapper">
        <h1 className="canvas-title">Agentic AI Architecture & Context Engineering Canvas</h1>

        <div className="grid">
          {/* Row 1 */}

          {/* 1. Business Objective */}
          <div className="card card-biz">
            <div className="card-header header-red">
              <span className="num">1</span> Business Objective
            </div>
            <div className="card-body">
              <h3>What problem should the agent solve?</h3>
              <ul>
                <li><strong>Target workflow:</strong> Automate ERP operations — time entry, billing, client onboarding, reporting, compliance</li>
                <li><strong>Expected outcomes:</strong>
                  <ul>
                    <li>Reduce manual time entry effort by 40%</li>
                    <li>95%+ first-pass invoice accuracy</li>
                    <li>30% faster client onboarding</li>
                    <li>70%+ AI feature adoption in 3 months</li>
                  </ul>
                </li>
                <li><strong>Success metrics:</strong> Time saved, invoice accuracy, onboarding speed, user adoption rate</li>
              </ul>
              <div className="example-box">
                <strong>Example:</strong>
                <ul style={{ paddingLeft: '14px', margin: 0 }}>
                  <li>Auto-draft weekly timesheets from calendar/project activity</li>
                  <li>Generate invoice drafts with correct rates and VAT</li>
                  <li>Pre-screen new clients via Verified.eu</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. Agent Role Definition */}
          <div className="card card-role">
            <div className="card-header header-purple">
              <span className="num">2</span> Agent Role Definition
            </div>
            <div className="card-body">
              <h3>What role does the agent play?</h3>
              <ul>
                <li><strong>Agent role:</strong> Operations Assistant & Analyst</li>
                <li><strong>Decision autonomy level:</strong>
                  <ul>
                    <li><strong>Autonomous:</strong> Data lookups, reports, timesheet pre-fill, notifications</li>
                    <li><strong>Supervised:</strong> Invoice drafts, rate recommendations, compliance pre-fill</li>
                    <li><strong>Human-required:</strong> Invoice approval, client acceptance, write-offs</li>
                  </ul>
                </li>
                <li><strong>Human-in-the-Loop checkpoints:</strong>
                  <ul>
                    <li>Before any invoice is finalized</li>
                    <li>Before client acceptance status changes</li>
                    <li>Before financial adjustments applied</li>
                    <li>Before syncing to Horizon</li>
                  </ul>
                </li>
              </ul>
              <div className="example-box">
                <strong>Example agents:</strong>
                <div style={{ marginTop: '4px' }}>
                  <span className="agent-badge">Billing Assistant Agent</span>
                  <span className="agent-badge">Onboarding Agent</span>
                  <span className="agent-badge">Analytics Agent</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Context Engineering */}
          <div className="card card-context">
            <div className="card-header header-teal">
              <span className="num">4</span> Context Engineering
            </div>
            <div className="card-body">
              <h3>What information does the agent need to perform well?</h3>
              <div className="context-grid">
                <div>
                  <div className="sub-section-title">Context sources:</div>
                  <ul style={{ fontSize: '11.5px', paddingLeft: '14px' }}>
                    <li>Source code (17 .NET modules, Next.js)</li>
                    <li>Documentation (CLAUDE.md, workflow.md)</li>
                    <li>Database schemas (15 PostgreSQL schemas)</li>
                    <li>Business rules (rate hierarchy, VAT, entity isolation)</li>
                    <li>Logs / telemetry (audit log, sync logs)</li>
                    <li>Historical data (timesheets, invoices, WIP)</li>
                  </ul>
                </div>
                <div className="key-questions">
                  <h4>Key questions:</h4>
                  <ul style={{ fontSize: '11px', paddingLeft: '14px' }}>
                    <li>Task decomposition</li>
                    <li>Plan → Execute → Reflect Loops</li>
                    <li>Multi-agent collaboration</li>
                    <li>Self-critique / validation</li>
                    <li>Iterative refinement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Tasks & Capabilities */}
          <div className="card card-tasks">
            <div className="card-header header-green">
              <span className="num">3</span> Tasks & Capabilities
            </div>
            <div className="card-body">
              <h3>What actions must the agent perform?</h3>
              <div className="two-col">
                <div>
                  <ul>
                    <li>Pre-fill timesheets from calendar data</li>
                    <li>Draft invoices via 3-tier rate engine</li>
                    <li>VAT determination (21% / reverse / zero)</li>
                    <li>Monitor billing caps & WIP aging</li>
                    <li>Trigger client screenings (KYC)</li>
                    <li>Risk scoring & compliance forms</li>
                    <li>NL queries on financial data</li>
                  </ul>
                </div>
                <div>
                  <div className="example-box" style={{ marginTop: 0 }}>
                    <strong>Example task flow:</strong>
                    <ul style={{ paddingLeft: '14px', margin: 0, fontSize: '11px' }}>
                      <li>Approved time entries</li>
                      <li>Rate engine lookup</li>
                      <li>VAT determination</li>
                      <li>Invoice draft generation</li>
                      <li>Human review & approval</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Reasoning & Planning */}
          <div className="reasoning-card">
            <div className="reasoning-title">Reasoning & Planning</div>

            <div className="reasoning-columns">
              <div>
                <h4>Typical strategies:</h4>
                <ul>
                  <li>Task decomposition</li>
                  <li>Plan ◁</li>
                  <li>Execute</li>
                  <li>Reflect</li>
                </ul>
              </div>
              <div>
                <h4>Evaluation testing:</h4>
                <ul>
                  <li>Repeatable</li>
                  <li>Deterministic validation</li>
                  <li>100% financial calc coverage</li>
                </ul>
              </div>
            </div>

            <div className="goal-circle-container">
              <div className="goal-circle">
                <div className="goal-segment seg-reflect">Reflect</div>
                <div className="goal-segment seg-plan">Plan</div>
                <div className="goal-segment seg-execute">Execute</div>
                <div className="goal-segment seg-refine">Refine</div>
                <div className="goal-center">GOAL</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#666', fontWeight: 600, padding: '0 20px' }}>
              <span>Multi-agent<br/>collaborate</span>
              <span style={{ textAlign: 'right' }}>Becoming<br/>autonomous</span>
            </div>

            <div className="arch-patterns">
              <strong>Architectural patterns:</strong>
              <div className="flow-arrow">
                Goal <span>→</span> Plan <span>→</span> Execute <span>→</span> Reflect <span>→</span> Refine
              </div>
            </div>
          </div>

          {/* 6. Tooling & Integrations */}
          <div className="card card-tooling">
            <div className="card-header header-blue">
              <span className="num">6</span> Tooling & Integrations
            </div>
            <div className="card-body">
              <h3>What tools can the agent use?</h3>
              <ul>
                <li><strong>Code:</strong> Lexora monorepo (GitHub) — .NET 8 + Next.js</li>
                <li><strong>Database:</strong> PostgreSQL (15 schemas) via EF Core</li>
                <li><strong>CI/CD:</strong> GitHub Actions</li>
                <li><strong>APIs:</strong> Entra ID, World-Check, Verified.eu, Horizon, Claude API</li>
                <li><strong>Azure:</strong> Blob Storage, Key Vault, App Service</li>
                <li><strong>PDF:</strong> QuestPDF for invoices & reports</li>
              </ul>
              <div className="tooltip-box">
                Agents become powerful when they can use tools autonomously
              </div>
              <div className="tooltip-box" style={{ marginTop: '4px' }}>
                Agents become powerful when they use rule-based automation
              </div>
            </div>
          </div>

          {/* 5. Memory Design */}
          <div className="card card-memory">
            <div className="card-header header-orange">
              <span className="num">5</span> Memory Design
            </div>
            <div className="card-body">
              <h3>What does the agent remember?</h3>
              <div className="memory-grid">
                <div className="memory-col short">
                  <h4>Short-term:</h4>
                  <ul>
                    <li>Conversation context</li>
                    <li>Current task state</li>
                    <li>Session data (entity, role, permissions)</li>
                  </ul>
                </div>
                <div className="memory-col persistent">
                  <h4>Persistent:</h4>
                  <ul>
                    <li>Vector database (invoices, patterns)</li>
                    <li>Knowledge graphs (entities, rate cards)</li>
                    <li>Document stores (templates)</li>
                    <li>User preferences & approval history</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 7. Human Interaction Model */}
          <div className="card card-interaction">
            <div className="card-header header-teal">
              <span className="num">7</span> Human Interaction Model
            </div>
            <div className="card-body">
              <h3>When do humans intervene?</h3>
              <ul>
                <li><strong>Requirement validation:</strong> Confirm invoice amounts</li>
                <li><strong>Architecture approval:</strong> Rate card / billing rule changes</li>
                <li><strong>Edge case confirmation:</strong> Cross-entity billing, non-standard VAT</li>
                <li><strong>Business rule clarification:</strong> Write-off thresholds, risk scoring</li>
              </ul>
              <div className="interaction-types">
                <h4>Interaction types:</h4>
                <ul style={{ paddingLeft: '14px', fontSize: '11px' }}>
                  <li><strong>Review:</strong> Draft → approve/reject</li>
                  <li><strong>Feedback:</strong> User corrects → agent learns</li>
                  <li><strong>Prompt steering:</strong> User specifies scope</li>
                  <li><strong>Approval gates:</strong> PM → Finance → Partner → CFO</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
