export const initialCourses = [
  {
    id: 1,
    title: "Enterprise Cybersecurity & Penetration Testing",
    category: "Security",
    level: "Advanced",
    duration: "6 weeks",
    instructor: "Sarah Jenkins, CISSP",
    role: "Principal Red-Team Consultant",
    rating: "4.9",
    students: "3.2k",
    featured: true,
    description: "Master offensive security methodologies, vulnerability discovery, ethical exploitation, and defensive hardening.",
    skills: ["Vulnerability Assessment", "OWASP Top 10", "Network Pivoting", "Metasploit", "Cryptography"],
    badge: "Cyber Sentinel",
    enrolled: true,
    completed: false,
    completedLessons: [0],
    lessons: [
      {
        id: "l1-1",
        title: "Reconnaissance & Attack Surface Mapping",
        duration: "35 min",
        overview: "Active and passive footprinting are the foundations of penetration testing. Learn how to map public-facing CIDR blocks, query DNS registries, and locate subdomains without tripping WAF detection.",
        keyTakeaways: [
          "Passive intelligence gathering via WHOIS, OSINT, and Certificate Transparency logs.",
          "Port scanning heuristics with TCP SYN half-open probes and banner grabbing.",
          "Mapping attack surfaces to the MITRE ATT&CK framework."
        ],
        codeSnippet: `# Scan target perimeter safely with stealth flags
nmap -sS -T4 -p 22,80,443,8080,8443 --script ssl-enum-ciphers 10.0.4.15`,
        terminalTask: {
          prompt: "Run an Nmap stealth scan against target IP 10.0.4.15",
          command: "nmap -sS 10.0.4.15",
          output: "Starting Nmap 7.94 ( https://nmap.org )\nNmap scan report for target.internal (10.0.4.15)\nHost is up (0.0012s latency).\nPORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https\n8080/tcp open  http-proxy\nNmap done: 1 IP address scanned in 1.45 seconds"
        },
        quiz: {
          question: "Which Nmap scan technique sends a SYN packet and waits for SYN/ACK without completing the 3-way handshake?",
          options: [
            "TCP Connect Scan (-sT)",
            "TCP Stealth SYN Scan (-sS)",
            "UDP Scan (-sU)",
            "Null Scan (-sN)"
          ],
          correct: 1,
          explanation: "TCP SYN scan (-sS) is also known as half-open scanning; it sends an RST after receiving SYN/ACK so the connection is never fully established."
        }
      },
      {
        id: "l1-2",
        title: "Web Exploitation: OWASP Top 10 Deep Dive",
        duration: "45 min",
        overview: "Analyze severe application-layer vulnerabilities including SQL injection, Server-Side Request Forgery (SSRF), and Broken Object Level Authorization (BOLA).",
        keyTakeaways: [
          "Crafting parameterized prepared queries to neutralize SQLi.",
          "Preventing SSRF via strict outbound IP allowlisting and metadata protection.",
          "Validating cryptographic bearer tokens and JSON Web Token (JWT) algorithms."
        ],
        codeSnippet: `// Vulnerable: concatenation
const query = \`SELECT * FROM users WHERE id = '\${userId}'\`;

// Hardened: Parameterized Prepared Statement
const query = "SELECT id, email, role FROM users WHERE id = $1";
const result = await db.query(query, [userId]);`,
        terminalTask: {
          prompt: "Audit authorization headers via curl probe",
          command: "curl -I -H 'Authorization: Bearer invalid' https://api.internal/v1/auth",
          output: "HTTP/2 401 Unauthorized\nDate: Wed, 15 Oct 2026 00:00:00 GMT\nServer: CyberSNova-Shield/2.4\nWWW-Authenticate: Bearer error=\"invalid_token\"\nContent-Type: application/json; charset=utf-8"
        },
        quiz: {
          question: "What is the primary defense against SQL Injection flaws in modern web services?",
          options: [
            "Escaping single quotes using custom regex",
            "Using prepared statements with parameterized queries",
            "Converting all user input into lowercase",
            "Encrypting client cookies with SHA-256"
          ],
          correct: 1,
          explanation: "Parameterized queries ensure user input is treated strictly as data rather than executable SQL syntax."
        }
      },
      {
        id: "l1-3",
        title: "Cryptographic Protocols & Zero-Trust Hardening",
        duration: "40 min",
        overview: "Implement modern cryptographic primitives including AES-GCM-256, TLS 1.3 handshakes, ephemeral Diffie-Hellman, and zero-trust identity segmentation.",
        keyTakeaways: [
          "Authenticated symmetric encryption with Galois/Counter Mode (GCM).",
          "Public-key infrastructure (PKI) and automated certificate lifecycle.",
          "Mutual TLS (mTLS) authentication across microservice meshes."
        ],
        codeSnippet: `import { createCipheriv, randomBytes } from 'crypto';

const iv = randomBytes(12);
const cipher = createCipheriv('aes-256-gcm', secretKey, iv);
const encrypted = Buffer.concat([cipher.update(payload, 'utf8'), cipher.final()]);
const authTag = cipher.getAuthTag();`,
        terminalTask: {
          prompt: "Inspect certificate validity and cipher suites",
          command: "openssl s_client -connect secure.cybersnova.com:443 -tls1_3",
          output: "CONNECTED(00000003)\nNew, TLSv1.3, Cipher is TLS_AES_256_GCM_SHA384\nServer certificate: CN=secure.cybersnova.com\nVerify return code: 0 (ok)"
        },
        quiz: {
          question: "Which TLS version completely removed support for obsolete ciphers such as RC4, 3DES, and static RSA key exchange?",
          options: ["TLS 1.0", "TLS 1.1", "TLS 1.2", "TLS 1.3"],
          correct: 3,
          explanation: "TLS 1.3 pruned legacy insecure algorithms and mandated Perfect Forward Secrecy (PFS)."
        }
      }
    ]
  },
  {
    id: 2,
    title: "Full Stack Software Architecture & Scalability",
    category: "Software",
    level: "Advanced",
    duration: "8 weeks",
    instructor: "Dr. Alexander Vance",
    role: "Former Staff Architect @ Meta",
    rating: "4.9",
    students: "4.1k",
    featured: true,
    description: "Design high-performance distributed systems, event-driven architectures, caching tiers, and resilient microservices.",
    skills: ["Microservices", "Event-Driven Architecture", "Kafka", "PostgreSQL Sharding", "Redis Caching"],
    badge: "System Architect",
    enrolled: false,
    completed: false,
    completedLessons: [],
    lessons: [
      {
        id: "l2-1",
        title: "System Design Fundamentals & CAP Theorem",
        duration: "40 min",
        overview: "Balance consistency, availability, and partition tolerance in distributed databases. Formulate back-of-the-envelope calculations for scale.",
        keyTakeaways: [
          "Understanding PACELC tradeoffs in real-world distributed stores.",
          "Consistent hashing algorithms for distributed caching nodes.",
          "Designing for idempotency with unique correlation UUIDs."
        ],
        codeSnippet: `// Idempotency key pattern for critical transaction endpoints
async function processPayment(req, res) {
  const idempotencyKey = req.headers['x-idempotency-key'];
  const existing = await redis.get(\`idem:\${idempotencyKey}\`);
  if (existing) return res.json(JSON.parse(existing));
  
  const order = await paymentGateway.charge(req.body);
  await redis.setex(\`idem:\${idempotencyKey}\`, 86400, JSON.stringify(order));
  return res.json(order);
}`,
        terminalTask: {
          prompt: "Check Redis cluster node synchronization status",
          command: "redis-cli cluster info",
          output: "cluster_state:ok\ncluster_slots_assigned:16384\ncluster_slots_ok:16384\ncluster_known_nodes:6\ncluster_size:3"
        },
        quiz: {
          question: "Under the CAP theorem, what does a distributed system guarantee during a network partition if it prioritizes CP?",
          options: [
            "Every non-failing node returns a response, even if stale",
            "Every read receives the most recent write or an error",
            "Infinite horizontal scalability with zero latency",
            "Zero memory footprint on master nodes"
          ],
          correct: 1,
          explanation: "CP systems sacrifice availability to ensure data consistency across non-partitioned nodes."
        }
      },
      {
        id: "l2-2",
        title: "High-Throughput Event Streaming with Kafka",
        duration: "50 min",
        overview: "Decouple backend subsystems with Apache Kafka topics, partition balancing, consumer groups, and dead-letter queues.",
        keyTakeaways: [
          "Partition key distribution to guarantee in-order message delivery.",
          "Configuring acknowledgment levels (acks=all) for zero-data-loss durability.",
          "Managing consumer rebalances without blocking active threads."
        ],
        codeSnippet: `const { Kafka } = require('kafkajs');
const kafka = new Kafka({ clientId: 'lms-engine', brokers: ['kafka:9092'] });

const producer = kafka.producer({ idempotent: true });
await producer.send({
  topic: 'user-events',
  messages: [{ key: user.id, value: JSON.stringify({ event: 'LESSON_COMPLETE', ts: Date.now() }) }]
});`,
        terminalTask: {
          prompt: "List active Kafka topics and consumer lag",
          command: "kafka-consumer-groups --bootstrap-server localhost:9092 --describe --group lms-analytics",
          output: "GROUP         TOPIC           PARTITION  CURRENT-OFFSET  LOG-END-OFFSET  LAG\nlms-analytics user-events     0          104829          104830          1\nlms-analytics user-events     1          98412           98412           0"
        },
        quiz: {
          question: "In Apache Kafka, what determines the ordering guarantee of messages within a topic?",
          options: [
            "Messages are globally ordered across all topics",
            "Messages are ordered only within the same partition",
            "Ordering is determined randomly by the zookeeper leader",
            "Kafka does not provide any message ordering"
          ],
          correct: 1,
          explanation: "Kafka guarantees strict total order only within an individual partition of a topic."
        }
      },
      {
        id: "l2-3",
        title: "Database Indexing, B-Trees & Sharding",
        duration: "45 min",
        overview: "Dive into relational query planners, composite B-Tree indexes, EXPLAIN ANALYZE traces, and horizontal sharding strategies.",
        keyTakeaways: [
          "Index selectivity and avoiding sequential table scans.",
          "Partition pruning for time-series and tenant-isolated tables.",
          "Preventing N+1 query patterns using batch loaders."
        ],
        codeSnippet: `-- Create composite index tailored to filter + sort
CREATE INDEX CONCURRENTLY idx_enrollments_student_date 
ON enrollments (student_id, enrolled_at DESC);

EXPLAIN ANALYZE 
SELECT * FROM enrollments 
WHERE student_id = 'usr_8921' 
ORDER BY enrolled_at DESC LIMIT 10;`,
        terminalTask: {
          prompt: "Execute EXPLAIN query against PostgreSQL cluster",
          command: "psql -d cybersnova -c 'EXPLAIN ANALYZE SELECT * FROM users WHERE status = \"active\";'",
          output: "Index Scan using idx_users_status on users  (cost=0.42..8.44 rows=1 width=128) (actual time=0.038..0.041 rows=1 loops=1)\nPlanning Time: 0.125 ms\nExecution Time: 0.065 ms"
        },
        quiz: {
          question: "Why should indexes generally not be placed on low-cardinality boolean columns alone?",
          options: [
            "Because boolean indexes crash modern SQL engines",
            "Because the query optimizer will prefer a sequential scan when a large percentage of rows match",
            "Because booleans require 128 bits of disk space",
            "Because B-trees only accept floating-point numbers"
          ],
          correct: 1,
          explanation: "Low cardinality yields poor selectivity; scanning the whole table is often faster for the database engine than random index lookups."
        }
      }
    ]
  },
  {
    id: 3,
    title: "Applied AI, Machine Learning & LLM Systems",
    category: "AI & Data",
    level: "Intermediate",
    duration: "10 weeks",
    instructor: "Prof. Marcus Thorne",
    role: "AI Research Fellow @ Stanford",
    rating: "4.9",
    students: "5.6k",
    featured: true,
    description: "Build, fine-tune, and deploy intelligent agents, retrieval-augmented generation (RAG) pipelines, and neural networks.",
    skills: ["Python", "PyTorch", "RAG Architecture", "Vector Databases", "Prompt Engineering", "FastAPI"],
    badge: "Neural Architect",
    enrolled: false,
    completed: false,
    completedLessons: [],
    lessons: [
      {
        id: "l3-1",
        title: "Vector Embeddings & Semantic Search Pipelines",
        duration: "45 min",
        overview: "Transform unstructured text and code into high-dimensional vector representations. Query embeddings using cosine similarity and HNSW index structures.",
        keyTakeaways: [
          "High-dimensional vector geometry and cosine distance.",
          "Chunking strategies: recursive character splitting vs sentence boundary.",
          "Hybrid search: combining BM25 keyword matching with dense vectors."
        ],
        codeSnippet: `from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')
texts = ["Cybersecurity threat intelligence", "SQL injection mitigation"]
embeddings = model.encode(texts, normalize_embeddings=True)
similarity = np.dot(embeddings[0], embeddings[1])`,
        terminalTask: {
          prompt: "Query vector database index stats",
          command: "curl -s http://localhost:6333/collections/knowledge_base",
          output: '{"status":"ok","result":{"vectors_count":142500,"indexed_vectors_count":142500,"status":"green"}}'
        },
        quiz: {
          question: "What metric is most commonly used to measure the directional orientation of two normalized embeddings?",
          options: ["Manhattan Distance", "Cosine Similarity", "Hamming Distance", "Jaccard Index"],
          correct: 1,
          explanation: "Cosine similarity measures the cosine of the angle between two non-zero vectors, independent of magnitude."
        }
      },
      {
        id: "l3-2",
        title: "Retrieval Augmented Generation (RAG) Architecture",
        duration: "50 min",
        overview: "Ground Large Language Models on proprietary documentation to eliminate hallucinations. Build reranking and provenance validation.",
        keyTakeaways: [
          "Document ingestion, semantic chunking, and metadata tagging.",
          "Cross-encoder reranking to surface top-k relevant context.",
          "Guardrails to detect prompt injections and unsafe generation."
        ],
        codeSnippet: `async def generate_grounded_answer(user_prompt: str):
    query_vector = embed(user_prompt)
    contexts = vector_db.search(query_vector, top_k=5)
    reranked = reranker.rank(query=user_prompt, docs=contexts)[:3]
    
    prompt = f"Context:\\n{format_docs(reranked)}\\n\\nQuestion: {user_prompt}\\nAnswer accurately:"
    return await llm.complete(prompt)`,
        terminalTask: {
          prompt: "Test RAG generation endpoint with curl",
          command: "curl -X POST http://localhost:8000/api/rag -H 'Content-Type: application/json' -d '{\"query\":\"Explain zero trust\"}'",
          output: '{"answer":"Zero Trust is a cybersecurity model based on the principle \'never trust, always verify\'.","sources":["nist-sp800-207.pdf"]}'
        },
        quiz: {
          question: "In RAG pipelines, what role does a Cross-Encoder Reranker play?",
          options: [
            "It generates image assets from descriptions",
            "It scores (query, document) pairs together to refine top-k retrieval accuracy",
            "It compresses SQL queries into JSON format",
            "It replaces the vector database entirely"
          ],
          correct: 1,
          explanation: "Cross-encoders evaluate the full attention interaction between query and document, yielding higher precision ranking than dual-encoder bi-encoders."
        }
      },
      {
        id: "l3-3",
        title: "Model Fine-Tuning with LoRA & PEFT",
        duration: "40 min",
        overview: "Fine-tune foundation models on enterprise datasets without retraining all billions of parameters using Low-Rank Adaptation (LoRA).",
        keyTakeaways: [
          "Low-Rank Adaptation mathematics: decomposing weight updates into rank matrices.",
          "Quantization techniques: 4-bit and 8-bit QLoRA on consumer hardware.",
          "Loss curves, perplexity metrics, and evaluation on unseen benchmarks."
        ],
        codeSnippet: `from peft import LoraConfig, get_peft_model

lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)
model = get_peft_model(base_model, lora_config)
model.print_trainable_parameters()`,
        terminalTask: {
          prompt: "Monitor GPU memory utilization during training",
          command: "nvidia-smi --query-gpu=utilization.gpu,memory.used,memory.total --format=csv",
          output: "utilization.gpu [%], memory.used [MiB], memory.total [MiB]\n96 %, 14210 MiB, 24576 MiB"
        },
        quiz: {
          question: "What is the primary benefit of LoRA compared to full model parameter fine-tuning?",
          options: [
            "It freezes the base model and trains low-rank matrix updates, slashing VRAM usage by over 70%",
            "It removes the need for any training data",
            "It makes Python run faster than C++",
            "It converts text models into image generators"
          ],
          correct: 0,
          explanation: "LoRA only updates small low-rank decomposition matrices while freezing base weights, drastically reducing compute and memory overhead."
        }
      }
    ]
  },
  {
    id: 4,
    title: "Cloud Engineering & DevOps with AWS & Kubernetes",
    category: "Cloud",
    level: "Intermediate",
    duration: "7 weeks",
    instructor: "Jordan Lee, AWS Solutions Architect",
    role: "Lead Cloud Infrastructure Engineer",
    rating: "4.8",
    students: "2.8k",
    featured: false,
    description: "Architect resilient multi-region infrastructure, automate deployment pipelines with Terraform, and orchestrate containers with Kubernetes.",
    skills: ["Kubernetes (K8s)", "Terraform", "AWS VPC", "CI/CD Actions", "Prometheus & Grafana"],
    badge: "Cloud Pioneer",
    enrolled: false,
    completed: false,
    completedLessons: [],
    lessons: [
      {
        id: "l4-1",
        title: "Infrastructure as Code with Terraform & AWS",
        duration: "40 min",
        overview: "Codify cloud architecture using declarative HCL. Manage remote S3 state backends, state locking with DynamoDB, and modular VPC setups.",
        keyTakeaways: [
          "State management, dependency graphs, and resource drift detection.",
          "Designing multi-AZ VPC topologies with public and private subnets.",
          "Enforcing least privilege IAM policies with automated policy linters."
        ],
        codeSnippet: `resource "aws_vpc" "cyber_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = { Name = "cybersnova-production-vpc" }
}

resource "aws_subnet" "private_app" {
  vpc_id            = aws_vpc.cyber_vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"
}`,
        terminalTask: {
          prompt: "Plan Terraform infrastructure changes",
          command: "terraform plan",
          output: "Terraform will perform the following actions:\n  + aws_vpc.cyber_vpc\n  + aws_subnet.private_app\nPlan: 2 to add, 0 to change, 0 to destroy."
        },
        quiz: {
          question: "Why should Terraform remote state files be protected with server-side encryption and locking?",
          options: [
            "They may contain sensitive plaintext outputs and concurrent writes could corrupt state",
            "Terraform refuses to compile without DynamoDB",
            "To prevent the browser from caching CSS",
            "Because AWS requires all files to be ZIP archives"
          ],
          correct: 0,
          explanation: "State files often contain sensitive secrets or IP mappings, and locking prevents split-brain state corruption."
        }
      },
      {
        id: "l4-2",
        title: "Kubernetes Container Orchestration & Pod Lifecycle",
        duration: "50 min",
        overview: "Deploy stateless and stateful workloads into Kubernetes clusters. Configure Ingress controllers, Horizontal Pod Autoscalers (HPA), and health probes.",
        keyTakeaways: [
          "Liveness, readiness, and startup probes to ensure zero-downtime rollouts.",
          "ConfigMaps and Secrets injection without rebuilding container images.",
          "Resource limits (CPU, memory) to prevent noisy-neighbor node eviction."
        ],
        codeSnippet: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-service
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: api
        image: cybersnova/api:v2.4
        resources:
          limits: { memory: "512Mi", cpu: "500m" }
        readinessProbe:
          httpGet: { path: /healthz, port: 8080 }`,
        terminalTask: {
          prompt: "Check Kubernetes cluster pod status",
          command: "kubectl get pods -n production -o wide",
          output: "NAME                           READY   STATUS    RESTARTS   AGE   IP           NODE\napi-service-78f9c8d5b-4k2ls    1/1     Running   0          18m   10.244.1.14  node-01\napi-service-78f9c8d5b-9xp2m    1/1     Running   0          18m   10.244.2.8   node-02"
        },
        quiz: {
          question: "Which probe does Kubernetes use to determine if a container should receive traffic from a Service?",
          options: ["Liveness Probe", "Readiness Probe", "Startup Probe", "Security Probe"],
          correct: 1,
          explanation: "Readiness probes determine whether a pod is ready to accept requests; if failing, traffic is routed away."
        }
      }
    ]
  },
  {
    id: 5,
    title: "Defensive DevSecOps & Zero-Trust Infrastructure",
    category: "Security",
    level: "Advanced",
    duration: "6 weeks",
    instructor: "Elena Rostova",
    role: "Head of Security Engineering",
    rating: "4.9",
    students: "1.9k",
    featured: false,
    description: "Integrate security automation into the CI/CD pipeline, manage secrets, container vulnerability scanning, and eBPF observability.",
    skills: ["SAST/DAST", "Trivy", "Vault", "eBPF", "Docker Hardening"],
    badge: "Shield Master",
    enrolled: false,
    completed: false,
    completedLessons: [],
    lessons: [
      {
        id: "l5-1",
        title: "Automated Pipeline Security (SAST, DAST, SCA)",
        duration: "35 min",
        overview: "Shift security left by automatically catching dependency CVEs and insecure code patterns during GitHub Actions CI runs.",
        keyTakeaways: [
          "Software Bill of Materials (SBOM) generation and vulnerability triaging.",
          "Preventing secret leakage via pre-commit hooks and GitGuardian.",
          "Policy-as-code enforcement with Open Policy Agent (OPA)."
        ],
        codeSnippet: `# Trivy container vulnerability scan in GitHub Actions
- name: Run Trivy Vulnerability Scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'cybersnova/api:\${{ github.sha }}'
    format: 'sarif'
    exit-code: '1'
    severity: 'CRITICAL,HIGH'`,
        terminalTask: {
          prompt: "Run Trivy scan against base container image",
          command: "trivy image --severity HIGH,CRITICAL node:20-alpine",
          output: "node:20-alpine (alpine 3.20.0)\nTotal: 0 (HIGH: 0, CRITICAL: 0)\nBase image meets production security standards."
        },
        quiz: {
          question: "What does SCA stand for in application security pipelines?",
          options: [
            "Software Composition Analysis",
            "Secure Cloud Architecture",
            "System Container Allocation",
            "Synchronous Cipher Algorithm"
          ],
          correct: 0,
          explanation: "Software Composition Analysis scans third-party open-source libraries for known security vulnerabilities (CVEs)."
        }
      }
    ]
  },
  {
    id: 6,
    title: "Design Systems & Modern Product UI/UX",
    category: "Design",
    level: "Beginner",
    duration: "5 weeks",
    instructor: "Amara Okafor",
    role: "Staff Product Designer @ Stripe",
    rating: "4.8",
    students: "1.4k",
    featured: false,
    description: "Build scalable design token architectures, accessible WCAG 2.1 AAA color palettes, micro-interactions, and component libraries.",
    skills: ["Design Tokens", "Figma", "Micro-Interactions", "WCAG 2.1 AAA", "CSS Architecture"],
    badge: "Aesthetic Architect",
    enrolled: false,
    completed: false,
    completedLessons: [],
    lessons: [
      {
        id: "l6-1",
        title: "Design Tokens & Scalable Color Math",
        duration: "30 min",
        overview: "Translate visual identity into mathematical design tokens. Structure semantic color scales using OKLCH and HSL color spaces.",
        keyTakeaways: [
          "Separating global primitive tokens from semantic aliases.",
          "Predictable perceived lightness with OKLCH color space.",
          "Fluid typography scales using clamp() functions."
        ],
        codeSnippet: `:root {
  /* Primitive Tokens */
  --color-violet-500: oklch(0.62 0.22 285);
  
  /* Semantic Tokens */
  --brand-primary: var(--color-violet-500);
  --interactive-focus: color-mix(in oklch, var(--brand-primary) 85%, white);
}`,
        terminalTask: {
          prompt: "Audit CSS bundle size and token count",
          command: "cat style.css | grep -c '\-\-'",
          output: "42 custom CSS properties defined in design system token registry."
        },
        quiz: {
          question: "What is the key advantage of semantic design tokens over raw hex color codes?",
          options: [
            "Semantic tokens describe purpose (e.g. --bg-surface) allowing dynamic theming without altering component logic",
            "Hex colors are no longer supported in modern browsers",
            "Semantic tokens make JavaScript execute in parallel",
            "Hex codes take up twice as much disk storage"
          ],
          correct: 0,
          explanation: "Semantic tokens separate intent from specific values, making themes and design updates trivial to manage."
        }
      }
    ]
  }
];
