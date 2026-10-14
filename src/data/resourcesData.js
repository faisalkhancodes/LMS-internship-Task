export const initialResources = [
  {
    id: "r1",
    title: "OWASP Top 10 Attack & Defense Matrix",
    category: "Security",
    type: "Interactive Reference",
    size: "3.2 MB",
    readTime: "12 min read",
    description: "Comprehensive vulnerability breakdown covering injection flaws, broken auth, SSRF, and actionable mitigation patterns.",
    iconName: "ShieldCheck",
    downloadFileName: "owasp-top10-cheatsheet.md",
    content: `# OWASP Top 10 Security Matrix & Mitigation Guidelines

## 1. Broken Object Level Authorization (BOLA)
* **Risk:** High. An attacker substitutes IDs in API routes (e.g. \`/api/users/1234/documents\`) to access unauthorized data.
* **Mitigation:**
  - Enforce record-level policy checks: \`WHERE document.user_id = session.user.id\`
  - Avoid predictable sequential integers; use random UUIDv4 or cryptographically secure tokens.

## 2. Broken Authentication & Session Management
* **Risk:** High. Weak passwords, credential stuffing, missing rate limits.
* **Mitigation:**
  - Require MFA on all privileged access points.
  - Implement Argon2id or bcrypt (cost factor >= 12) for salted hash storage.
  - Store JWT session refresh tokens in \`HttpOnly\`, \`Secure\`, \`SameSite=Strict\` cookies.

## 3. Server-Side Request Forgery (SSRF)
* **Risk:** Critical. The web server fetches remote resources using untrusted URLs, allowing access to internal clouds (\`169.254.169.254\`).
* **Mitigation:**
  - Strict outbound IP allowlists.
  - Reject connections targeting RFC 1918 private subnets and link-local ranges.
`
  },
  {
    id: "r2",
    title: "System Design & Distributed Scalability Handbook",
    category: "Software",
    type: "Architecture Blueprint",
    size: "5.8 MB",
    readTime: "18 min read",
    description: "Standard operating manual for designing 100k+ RPS services, caching invalidation strategies, and sharded storage.",
    iconName: "Code2",
    downloadFileName: "system-design-blueprint.md",
    content: `# Enterprise System Design & Scalability Principles

## 1. Caching Strategies (Cache-Aside vs Write-Through)
* **Cache-Aside (Lazy Loading):**
  - Read from cache. If miss, fetch from DB, write to cache, return.
  - Ideal for read-heavy workloads where data doesn't change every second.
* **Cache Stampede Prevention:**
  - Use probabilistic early expiration (XFetch algorithm) or distributed locks (Redlock).

## 2. High-Throughput Database Partitioning
* **Range Sharding:** Shard by timestamp or alphabetical key. Risk: Hotspots on latest range.
* **Hash Sharding:** Key hash modulo N shards. Even distribution, but resharding requires consistent hashing rings.
`
  },
  {
    id: "r3",
    title: "Applied LLM & Prompt Engineering Architecture",
    category: "AI & Data",
    type: "Study Guide",
    size: "4.4 MB",
    readTime: "15 min read",
    description: "Production patterns for grounding LLMs with Vector DBs, avoiding prompt injection, and evaluating hallucination rates.",
    iconName: "BrainCircuit",
    downloadFileName: "llm-rag-architecture-guide.md",
    content: `# Production LLM & RAG System Architecture

## 1. Chunking & Ingestion Pipeline
* **Recursive Character Splitting:** Split paragraphs, then sentences, preserving context.
* **Optimal Chunk Size:** 512 tokens with 10% overlap provides strong semantic cohesion for MiniLM and OpenAI embeddings.

## 2. Guardrails & Prompt Injection Mitigation
* Never interpolate raw user input directly into system instructions without XML encapsulation:
  \`<user_query>{{sanitized_input}}</user_query>\`
* Use secondary validation models or classification heads to detect jailbreak attempts.
`
  },
  {
    id: "r4",
    title: "Kubernetes & Cloud Infrastructure Cheatsheet",
    category: "Cloud",
    type: "DevOps Reference",
    size: "6.1 MB",
    readTime: "10 min read",
    description: "Quick commands, manifests, and troubleshooting tips for Kubernetes clusters, Helm charts, and CI/CD pipelines.",
    iconName: "Zap",
    downloadFileName: "kubernetes-production-cheatsheet.md",
    content: `# Kubernetes Cloud Infrastructure Cheatsheet

## Cluster Diagnosis Commands
\`\`\`bash
# View pod resource utilization
kubectl top pods --all-namespaces --sort-by=cpu

# Check pod describe logs and events
kubectl describe pod <pod-name> -n production

# Stream container logs with timestamps
kubectl logs -f <pod-name> -c api --timestamps --tail=100
\`\`\`
`
  }
];
