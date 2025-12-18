class DataAssessmentQuestionnaire {
    constructor() {
        this.currentQuestionId = 'q1';
        this.answers = {};
        this.questionHistory = [];

        this.questions = {
            q1: {
                title: "Where is your data primarily centralized today? (select all that apply)",
                type: "multiple",
                options: [
                    { id: "A", text: "Cloud data warehouse (Snowflake / BigQuery / Redshift / Synapse)" },
                    { id: "B", text: "Data lake / lakehouse (Databricks / S3 / GCS / ADLS)" },
                    { id: "C", text: "No central store (mostly SaaS tools)" },
                    { id: "D", text: "Primarily spreadsheets" },
                    { id: "E", text: "Not sure" }
                ],
                next: this.getQ1Next.bind(this)
            },
            q2_central: {
                title: "What types of data are most important to your business? (select all that apply)",
                type: "multiple",
                options: [
                    { id: "customer", text: "Customer / CRM / sales" },
                    { id: "product", text: "Product or event data (usage, logs, telemetry)" },
                    { id: "financial", text: "Financial / billing / revenue" },
                    { id: "marketing", text: "Marketing / growth" },
                    { id: "operational", text: "Operational / support" },
                    { id: "external", text: "External / third-party" }
                ],
                next: () => "q3_central"
            },
            q2_saas: {
                title: "What types of data are most important to your business? (select all that apply)",
                type: "multiple",
                options: [
                    { id: "customer", text: "Customer / CRM / sales" },
                    { id: "product", text: "Product or event data (usage, logs, telemetry)" },
                    { id: "financial", text: "Financial / billing / revenue" },
                    { id: "marketing", text: "Marketing / growth" },
                    { id: "operational", text: "Operational / support" },
                    { id: "external", text: "External / third-party" }
                ],
                next: () => "q3_saas"
            },
            q2_spreadsheets: {
                title: "What types of data feed your spreadsheets?",
                type: "multiple",
                options: [
                    { id: "manual", text: "Manual entry" },
                    { id: "saas", text: "SaaS exports" },
                    { id: "csv", text: "CSVs from engineering/DB" },
                    { id: "not_sure", text: "Not sure" }
                ],
                next: () => "q3_spreadsheets"
            },
            q2_not_sure: {
                title: "Who would best know where data lives?",
                type: "single",
                options: [
                    { id: "cto", text: "CTO / Engineering" },
                    { id: "data_head", text: "Head of Data / Analytics" },
                    { id: "finance", text: "Finance / RevOps" },
                    { id: "it", text: "IT / Security" },
                    { id: "not_sure", text: "Not sure" }
                ],
                next: () => "result_routing"
            },
            q3_central: {
                title: "On a typical day, how much *new* data do you ingest? (rough estimate is fine)",
                type: "single",
                options: [
                    { id: "very_little", text: "Very little (mostly static or periodic updates)" },
                    { id: "small", text: "Small but steady (daily batch updates)" },
                    { id: "moderate", text: "Moderate (continuous ingestion from multiple systems)" },
                    { id: "high", text: "High (event streams, logs, product telemetry)" },
                    { id: "not_sure", text: "Not sure" }
                ],
                next: () => "q4_central"
            },
            q3_saas: {
                title: "On a typical day, how much *new* data do you ingest? (rough estimate is fine)",
                type: "single",
                options: [
                    { id: "very_little", text: "Very little (mostly static or periodic updates)" },
                    { id: "small", text: "Small but steady (daily batch updates)" },
                    { id: "moderate", text: "Moderate (continuous ingestion from multiple systems)" },
                    { id: "high", text: "High (event streams, logs, product telemetry)" },
                    { id: "not_sure", text: "Not sure" }
                ],
                next: () => "q4_saas"
            },
            q3_spreadsheets: {
                title: "On a typical day, how much *new* data do you handle?",
                type: "single",
                options: [
                    { id: "very_little", text: "Very little (mostly static or periodic updates)" },
                    { id: "small", text: "Small but steady (daily batch updates)" },
                    { id: "moderate", text: "Moderate (continuous ingestion from multiple systems)" },
                    { id: "high", text: "High (event streams, logs, product telemetry)" },
                    { id: "not_sure", text: "Not sure" }
                ],
                next: () => "q4_spreadsheets"
            },
            q4_central: {
                title: "Approximately how many people regularly rely on data today?",
                type: "single",
                options: [
                    { id: "few", text: "Fewer than 10" },
                    { id: "small", text: "10–50" },
                    { id: "medium", text: "50–200" },
                    { id: "large", text: "200+" }
                ],
                next: () => "q5_central"
            },
            q4_saas: {
                title: "Do you use a BI / reporting tool today?",
                type: "single",
                options: [
                    { id: "yes", text: "Yes" },
                    { id: "no", text: "No" },
                    { id: "not_sure", text: "Not sure" }
                ],
                next: this.getQ4SaasNext.bind(this)
            },
            q4_spreadsheets: {
                title: "Approximately how many people rely on these spreadsheets?",
                type: "single",
                options: [
                    { id: "few", text: "Fewer than 10" },
                    { id: "small", text: "10–50" },
                    { id: "medium", text: "50–200" },
                    { id: "large", text: "200+" }
                ],
                next: () => "result_spreadsheets"
            },
            q5_central: {
                title: "Can you provide read-only metadata or usage exports from these systems? (no business data)",
                type: "single",
                options: [
                    { id: "yes", text: "Yes" },
                    { id: "maybe", text: "Maybe / requires approval" },
                    { id: "no", text: "No" },
                    { id: "not_sure", text: "Not sure" }
                ],
                next: this.getQ5CentralNext.bind(this)
            },
            q5_saas: {
                title: "Can you export BI usage stats (dashboards viewed, last accessed, owners)?",
                type: "single",
                options: [
                    { id: "yes", text: "Yes" },
                    { id: "maybe", text: "Maybe" },
                    { id: "no", text: "No" }
                ],
                next: this.getQ5SaasNext.bind(this)
            }
        };

        this.results = {
            result_green: {
                title: "GREEN PATH - Full Assessment Recommended",
                content: `
                    <h3>Full data-first assessment feasible</h3>
                    <p><strong>Recommended Approach:</strong></p>
                    <ul>
                        <li>Lead with metadata + usage analysis</li>
                        <li>Initialize Trovia with observed facts</li>
                        <li>Comprehensive data architecture review</li>
                        <li>Data quality and governance assessment</li>
                    </ul>
                    <p><strong>Next Steps:</strong> We can begin with a detailed technical assessment of your data infrastructure.</p>
                `,
                className: "green-path"
            },
            result_yellow: {
                title: "YELLOW PATH - Assessment Pending Approval",
                content: `
                    <h3>Feasible pending approval</h3>
                    <p><strong>Recommended Approach:</strong></p>
                    <ul>
                        <li>Provide security documentation for minimal export requirements</li>
                        <li>Offer approval email template for stakeholders</li>
                        <li>Begin with architecture patterns assessment</li>
                    </ul>
                    <p><strong>Next Steps:</strong> We'll provide documentation to help secure necessary approvals for metadata access.</p>
                `,
                className: "yellow-path"
            },
            result_limited: {
                title: "LIMITED PATH - Architecture-Focused Assessment",
                content: `
                    <h3>Assessment possible with reduced confidence</h3>
                    <p><strong>Recommended Approach:</strong></p>
                    <ul>
                        <li>Focus on architecture patterns and risk heuristics</li>
                        <li>Position as "Data Direction Snapshot"</li>
                        <li>Interview-based assessment methodology</li>
                    </ul>
                    <p><strong>Next Steps:</strong> We can proceed with a lighter assessment focused on strategic direction and risk identification.</p>
                `,
                className: "limited-path"
            },
            result_saas_green: {
                title: "SAAS GREEN/YELLOW PATH - Fragmentation Assessment",
                content: `
                    <h3>SaaS Environment Assessment</h3>
                    <p><strong>Recommended Approach:</strong></p>
                    <ul>
                        <li>Focus on data fragmentation and activation challenges</li>
                        <li>Assess data trust and decision-making workflows</li>
                        <li>Recommend centralization milestones if needed</li>
                    </ul>
                    <p><strong>Next Steps:</strong> We'll help identify opportunities to improve data coherence across your SaaS ecosystem.</p>
                `,
                className: "yellow-path"
            },
            result_saas_limited: {
                title: "SAAS LIMITED PATH - Decision Workflow Assessment",
                content: `
                    <h3>Reporting and Decision Workflow Assessment</h3>
                    <p><strong>Recommended Approach:</strong></p>
                    <ul>
                        <li>Emphasis on sources of truth and ownership clarity</li>
                        <li>Decision-making process evaluation</li>
                        <li>BI tool selection and implementation guidance</li>
                    </ul>
                    <p><strong>Next Steps:</strong> We'll focus on improving your reporting capabilities and establishing clear data ownership.</p>
                `,
                className: "limited-path"
            },
            result_spreadsheets: {
                title: "SPREADSHEET PATH - Centralization Planning",
                content: `
                    <h3>Spreadsheet Risk Mitigation</h3>
                    <p><strong>Recommended Approach:</strong></p>
                    <ul>
                        <li>Diagnose trust fractures and manual process risks</li>
                        <li>Define "minimum viable centralization" plan</li>
                        <li>Gradual migration strategy from spreadsheets</li>
                    </ul>
                    <p><strong>Next Steps:</strong> We'll help create a roadmap to reduce spreadsheet dependency and improve data reliability.</p>
                `,
                className: "yellow-path"
            },
            result_routing: {
                title: "ROUTING PATH - Initial Consultation",
                content: `
                    <h3>Discovery Session Recommended</h3>
                    <p><strong>Recommended Approach:</strong></p>
                    <ul>
                        <li>15-minute triage call to understand your data landscape</li>
                        <li>Internal stakeholder identification</li>
                        <li>Tailored assessment approach based on findings</li>
                    </ul>
                    <p><strong>Next Steps:</strong> Let's schedule a brief discovery call to better understand your data environment and recommend the right assessment approach.</p>
                `,
                className: "yellow-path"
            }
        };

        this.init();
    }

    init() {
        this.loadQuestion(this.currentQuestionId);
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('nextButton').addEventListener('click', () => this.nextQuestion());
        document.getElementById('backButton').addEventListener('click', () => this.previousQuestion());
        document.getElementById('restartButton').addEventListener('click', () => this.restart());
    }

    loadQuestion(questionId) {
        const question = this.questions[questionId];
        if (!question) {
            this.showResult();
            return;
        }

        document.getElementById('questionTitle').textContent = question.title;
        const optionsContainer = document.getElementById('questionOptions');
        optionsContainer.innerHTML = '';

        question.options.forEach(option => {
            const optionElement = this.createOptionElement(option, question.type);
            optionsContainer.appendChild(optionElement);
        });

        this.updateProgress();
        this.updateButtons();
    }

    createOptionElement(option, type) {
        const div = document.createElement('div');
        div.className = 'option';

        const input = document.createElement('input');
        input.type = type === 'multiple' ? 'checkbox' : 'radio';
        input.name = this.currentQuestionId;
        input.value = option.id;
        input.id = `${this.currentQuestionId}_${option.id}`;

        if (this.answers[this.currentQuestionId]) {
            if (type === 'multiple') {
                input.checked = this.answers[this.currentQuestionId].includes(option.id);
            } else {
                input.checked = this.answers[this.currentQuestionId] === option.id;
            }
        }

        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = option.text;

        div.appendChild(input);
        div.appendChild(label);

        input.addEventListener('change', () => {
            this.handleAnswerChange();
            if (input.checked) {
                div.classList.add('selected');
            } else {
                div.classList.remove('selected');
            }
        });

        div.addEventListener('click', (e) => {
            if (e.target !== input) {
                input.click();
            }
        });

        if (input.checked) {
            div.classList.add('selected');
        }

        return div;
    }

    handleAnswerChange() {
        const question = this.questions[this.currentQuestionId];
        const selectedOptions = Array.from(document.querySelectorAll(`input[name="${this.currentQuestionId}"]:checked`))
            .map(input => input.value);

        if (question.type === 'multiple') {
            this.answers[this.currentQuestionId] = selectedOptions;
        } else {
            this.answers[this.currentQuestionId] = selectedOptions[0] || null;
        }

        this.updateButtons();
    }

    updateButtons() {
        const hasAnswer = this.answers[this.currentQuestionId] &&
            (Array.isArray(this.answers[this.currentQuestionId]) ?
                this.answers[this.currentQuestionId].length > 0 :
                this.answers[this.currentQuestionId] !== null);

        document.getElementById('nextButton').disabled = !hasAnswer;
        document.getElementById('backButton').style.display = this.questionHistory.length > 0 ? 'block' : 'none';
    }

    nextQuestion() {
        const question = this.questions[this.currentQuestionId];
        if (!question) return;

        this.questionHistory.push(this.currentQuestionId);
        const nextQuestionId = question.next();
        this.currentQuestionId = nextQuestionId;

        if (nextQuestionId.startsWith('result_')) {
            this.showResult();
        } else {
            this.loadQuestion(nextQuestionId);
        }
    }

    previousQuestion() {
        if (this.questionHistory.length === 0) return;

        this.currentQuestionId = this.questionHistory.pop();
        this.loadQuestion(this.currentQuestionId);
    }

    getQ1Next() {
        const answers = this.answers.q1;
        if (!answers) return null;

        if (answers.includes('A') || answers.includes('B')) {
            return 'q2_central';
        } else if (answers.includes('C')) {
            return 'q2_saas';
        } else if (answers.includes('D')) {
            return 'q2_spreadsheets';
        } else if (answers.includes('E')) {
            return 'q2_not_sure';
        }
        return null;
    }

    getQ4SaasNext() {
        const answer = this.answers.q4_saas;
        if (answer === 'yes') {
            return 'q5_saas';
        } else {
            return 'result_saas_limited';
        }
    }

    getQ5CentralNext() {
        const answer = this.answers.q5_central;
        if (answer === 'yes') {
            return 'result_green';
        } else if (answer === 'maybe' || answer === 'not_sure') {
            return 'result_yellow';
        } else {
            return 'result_limited';
        }
    }

    getQ5SaasNext() {
        const answer = this.answers.q5_saas;
        if (answer === 'yes' || answer === 'maybe') {
            return 'result_saas_green';
        } else {
            return 'result_saas_limited';
        }
    }

    showResult() {
        const resultId = this.currentQuestionId;
        const result = this.results[resultId];

        if (!result) {
            console.error('Result not found:', resultId);
            return;
        }

        document.getElementById('questionContainer').style.display = 'none';
        document.getElementById('resultContainer').style.display = 'block';

        document.getElementById('resultTitle').textContent = result.title;
        const resultContent = document.getElementById('resultContent');
        resultContent.innerHTML = result.content;
        resultContent.className = `result-content ${result.className}`;

        this.updateProgress(100);
    }

    updateProgress(percentage = null) {
        const totalQuestions = Object.keys(this.questions).length;
        const currentProgress = percentage || ((this.questionHistory.length + 1) / totalQuestions) * 100;
        document.getElementById('progressFill').style.width = Math.min(currentProgress, 100) + '%';
    }

    restart() {
        this.currentQuestionId = 'q1';
        this.answers = {};
        this.questionHistory = [];

        document.getElementById('questionContainer').style.display = 'block';
        document.getElementById('resultContainer').style.display = 'none';

        this.loadQuestion(this.currentQuestionId);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DataAssessmentQuestionnaire();
});