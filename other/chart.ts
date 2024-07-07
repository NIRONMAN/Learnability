"use client"
const chart = `graph TD

subgraph "Neural Networks (NN)"
    A["Introduction"] --> B["Inspired by Human Brain"]
    B["Inspired by Human Brain"] --> C{Characteristics}
    C --> D["Massive Parallelism"]
    C --> E["Interconnections"]
    C --> F["Distributed Associative Memory"]
    A["Introduction"] --> G["Artificial Neural Networks (ANN)"]
    G["Artificial Neural Networks (ANN)"] --> H["Nodes - Neurons"]
    G["Artificial Neural Networks (ANN)"] --> I["Weights - Synapses"]
end

subgraph "Biological Inspiration"
    J["Biological Neurons"] --> K["86 Billion in Human Nervous System"]
    K["86 Billion in Human Nervous System"] --> L["Connected by Synapses (10¹⁴-10¹⁵)"]
    J["Biological Neurons"] --> M["Nucleus - Central"]
    M["Nucleus - Central"] --> N["Dendrites - Input"]
    M["Nucleus - Central"] --> O["Axon - Output"]
    O["Axon - Output"] --> P["Synapses - Connections"]
    P["Synapses - Connections"] --> Q["Synaptic Strength Changes - Learning"]
end

subgraph "Single Layer NN"
    R["Single Layer NN"] --> S["Perceptron - Basic Unit"]
    S["Perceptron - Basic Unit"] --> T["n-inputs"]
    T["n-inputs"] --> U["Weighted Sum Calculation"]
    U["Weighted Sum Calculation"] --> V["Transformation Function (f)"]
    V["Transformation Function (f)"] --> W["Activation Function"]
    W["Activation Function"] --> X["Linear, Thresholding, Non-Linear"]
end

subgraph "Activation Functions"
    Y["Activation Functions"] --> Z["Linear"]
    Y["Activation Functions"] --> AA["Thresholding/Step"]
    Y["Activation Functions"] --> AB["Non-Linear"]
    AB["Non-Linear"] --> AC["Sigmoid"]
    AB["Non-Linear"] --> AD["Tanh"]
    AB["Non-Linear"] --> AE["ReLU"]
    AB["Non-Linear"] --> AF["Leaky ReLU"]
end

subgraph "Multi Layer Perceptron (MLP)"
    AG["MLP"] --> AH["Feedforward Network"]
    AH["Feedforward Network"] --> AI["Single Layer Perceptron"]
    AH["Feedforward Network"] --> AJ["Multi Layer Perceptron"]
end

A["Introduction"] --> J["Biological Neurons"]
R["Single Layer NN"] --> Y["Activation Functions"]
Y["Activation Functions"] --> AG["MLP"]
`;
export default chart