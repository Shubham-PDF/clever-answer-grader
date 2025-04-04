
export interface QuestionData {
  id: string;
  subject: 'OS' | 'CN' | 'DSA';
  topic: string;
  question: string;
  ideal_answer: string;
  keywords: string[];
  marks: number;
}

export const questions: QuestionData[] = [
  {
    id: "os-1",
    subject: "OS",
    topic: "Process Synchronization",
    question: "What is a semaphore in operating systems? Explain its purpose and types.",
    ideal_answer: "A semaphore is a synchronization primitive used to control access to shared resources in concurrent processes. It helps prevent race conditions by allowing processes to wait until a resource becomes available. There are two types of semaphores: binary semaphores (mutex), which can have values 0 or 1, and counting semaphores, which can have arbitrary non-negative values. Binary semaphores are used for mutual exclusion, while counting semaphores are used to control access to a resource with multiple instances.",
    keywords: ["synchronization", "primitive", "shared resource", "concurrent", "race condition", "mutual exclusion", "binary semaphore", "counting semaphore", "mutex", "process"],
    marks: 10
  },
  {
    id: "os-2",
    subject: "OS",
    topic: "Deadlocks",
    question: "Explain the concept of deadlock in operating systems. What are the necessary conditions for a deadlock to occur?",
    ideal_answer: "A deadlock is a situation in which two or more processes are unable to proceed because each is waiting for resources held by another process. The four necessary conditions for a deadlock to occur are: (1) Mutual Exclusion: At least one resource must be held in a non-sharable mode. (2) Hold and Wait: A process must be holding at least one resource while waiting for additional resources. (3) No Preemption: Resources cannot be forcibly taken away from a process. (4) Circular Wait: There must exist a set of processes such that each process is waiting for a resource held by the next process in the set.",
    keywords: ["mutual exclusion", "hold and wait", "no preemption", "circular wait", "resource allocation", "waiting", "process", "non-sharable", "condition", "necessary"],
    marks: 10
  },
  {
    id: "cn-1",
    subject: "CN",
    topic: "Network Models",
    question: "Compare the OSI and TCP/IP reference models. Explain the key differences between them.",
    ideal_answer: "The OSI (Open Systems Interconnection) and TCP/IP (Transmission Control Protocol/Internet Protocol) models are frameworks that standardize communications between computer systems. The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. The TCP/IP model has 4 layers: Network Interface, Internet, Transport, and Application. Key differences include: (1) OSI is a theoretical model while TCP/IP is implementation-based. (2) OSI separates the upper layers (5-7) which TCP/IP combines into one Application layer. (3) TCP/IP combines the Physical and Data Link layers into one Network Interface layer. (4) TCP/IP is more widely used for internet communications. (5) OSI provides clear separation between services, interfaces, and protocols, while TCP/IP doesn't clearly distinguish between them.",
    keywords: ["OSI", "TCP/IP", "layers", "model", "reference", "physical", "data link", "network", "transport", "session", "presentation", "application", "internet", "network interface", "theoretical", "implementation"],
    marks: 10
  },
  {
    id: "cn-2",
    subject: "CN",
    topic: "Routing",
    question: "What is routing in computer networks? Explain different routing algorithms.",
    ideal_answer: "Routing is the process of selecting paths in a network along which to send network traffic. Routing algorithms determine the best paths for data transmission. There are several types of routing algorithms: (1) Distance Vector Routing: Routers exchange distance information to neighboring routers (e.g., RIP). (2) Link State Routing: Routers build a complete topology of the network and then calculate the shortest path (e.g., OSPF). (3) Path Vector Routing: Similar to distance vector but includes path information to avoid loops (e.g., BGP). (4) Static Routing: Routes are manually configured. (5) Dynamic Routing: Routes are learned automatically through routing protocols. Each algorithm has advantages and disadvantages in terms of convergence speed, scalability, and resource usage.",
    keywords: ["distance vector", "link state", "path vector", "static", "dynamic", "protocol", "RIP", "OSPF", "BGP", "topology", "shortest path", "convergence", "hop count", "metric", "network"],
    marks: 10
  },
  {
    id: "dsa-1",
    subject: "DSA",
    topic: "Graph Algorithms",
    question: "Explain Dijkstra's algorithm for finding the shortest path in a graph. What are its limitations?",
    ideal_answer: "Dijkstra's algorithm is a greedy algorithm that finds the shortest path from a source node to all other nodes in a weighted graph. It works by maintaining a set of unvisited nodes and a distance value for each node. Initially, all nodes are unvisited and their distances are set to infinity, except the source node which is set to 0. In each step, it selects the unvisited node with the minimum distance, marks it as visited, and updates the distances of its adjacent nodes if a shorter path is found. The algorithm continues until all nodes are visited. Limitations of Dijkstra's algorithm include: (1) It doesn't work correctly for graphs with negative edge weights. (2) It has relatively high time complexity O(V²) with adjacency matrix implementation, though it can be improved to O(E + V log V) using priority queues. (3) It doesn't work for graphs with negative cycles. (4) It computes single-source shortest paths, so for all-pairs shortest paths, it needs to be run V times.",
    keywords: ["greedy", "shortest path", "weighted graph", "source node", "distance", "unvisited", "adjacent", "negative edge", "time complexity", "priority queue", "negative cycle", "single-source"],
    marks: 10
  },
  {
    id: "dsa-2",
    subject: "DSA",
    topic: "Sorting Algorithms",
    question: "Compare quicksort and mergesort algorithms in terms of time complexity, space complexity, and stability.",
    ideal_answer: "Quicksort and mergesort are both efficient comparison-based sorting algorithms. Time complexity: Quicksort has an average case of O(n log n), but worst case O(n²) when poorly implemented or with pathological inputs. Mergesort consistently has O(n log n) for all cases. Space complexity: Quicksort uses O(log n) auxiliary space for recursion in the best implementation and can be done in-place. Mergesort requires O(n) auxiliary space for the temporary array in the standard implementation. Stability: Quicksort is not stable by default, meaning equal elements might change their relative order. Mergesort is stable, preserving the relative order of equal elements. Adaptivity: Quicksort is more adaptive to real-world data and often performs better in practice despite its worse theoretical worst-case. Mergesort performs more consistently across different inputs. Implementation: Quicksort is typically faster on arrays due to better locality of reference, while mergesort is more suitable for linked lists.",
    keywords: ["comparison-based", "time complexity", "space complexity", "stable", "in-place", "worst case", "average case", "O(n log n)", "O(n²)", "partition", "divide and conquer", "recursive", "auxiliary space", "adaptive"],
    marks: 10
  }
];
