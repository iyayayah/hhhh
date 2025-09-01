// Pretest and Posttest Questions from ENDAGAME PDF

export interface Question {
  id: number;
  question: string;
  options: { label: string; value: string }[];
  correctAnswer: string;
  explanation?: string;
}

export const pretestQuestions: Question[] = [
  {
    id: 1,
    question: "What does DNA stand for?",
    options: [
      { label: "Deoxyribonucleic Acid", value: "A" },
      { label: "Dynamic Nucleic Acid", value: "B" },
      { label: "Double Nucleic Arrangement", value: "C" },
      { label: "Deoxy Nitrogen Atom", value: "D" }
    ],
    correctAnswer: "A",
    explanation: "DNA stands for Deoxyribonucleic Acid, the molecule that carries genetic information."
  },
  {
    id: 2,
    question: "Which three parts make up a DNA nucleotide?",
    options: [
      { label: "Phosphate, sulfur, lipid", value: "A" },
      { label: "Sugar, phosphate, nitrogen base", value: "B" },
      { label: "Glucose, RNA, ribose", value: "C" },
      { label: "Carbon, oxygen, nitrogen", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "A DNA nucleotide consists of a sugar (deoxyribose), a phosphate group, and a nitrogen base."
  },
  {
    id: 3,
    question: "Which base pairs with Adenine in DNA?",
    options: [
      { label: "Guanine", value: "A" },
      { label: "Cytosine", value: "B" },
      { label: "Thymine", value: "C" },
      { label: "Uracil", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "In DNA, Adenine (A) pairs with Thymine (T) through hydrogen bonds."
  },
  {
    id: 4,
    question: "What type of bonds hold DNA strands together?",
    options: [
      { label: "Hydrogen bonds", value: "A" },
      { label: "Ionic bonds", value: "B" },
      { label: "Peptide bonds", value: "C" },
      { label: "Covalent bonds", value: "D" }
    ],
    correctAnswer: "A",
    explanation: "Hydrogen bonds between complementary base pairs hold the two DNA strands together."
  },
  {
    id: 5,
    question: "Key difference between DNA and RNA?",
    options: [
      { label: "DNA has uracil, RNA has thymine", value: "A" },
      { label: "DNA has deoxyribose, RNA has ribose", value: "B" },
      { label: "DNA is single-stranded, RNA is double-stranded", value: "C" },
      { label: "DNA only found in prokaryotes", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "DNA contains deoxyribose sugar while RNA contains ribose sugar."
  },
  {
    id: 6,
    question: "Where is most DNA stored in eukaryotic cells?",
    options: [
      { label: "Ribosomes", value: "A" },
      { label: "Cytoplasm", value: "B" },
      { label: "Nucleus", value: "C" },
      { label: "Mitochondria", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "In eukaryotic cells, most DNA is stored in the nucleus."
  },
  {
    id: 7,
    question: "A gene is best described as?",
    options: [
      { label: "A protein made of amino acids", value: "A" },
      { label: "Segment of DNA coding for a protein", value: "B" },
      { label: "Entire DNA sequence", value: "C" },
      { label: "A group of chromosomes", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "A gene is a specific segment of DNA that codes for a functional product, usually a protein."
  },
  {
    id: 8,
    question: "What is a codon?",
    options: [
      { label: "3-base sequence on mRNA", value: "A" },
      { label: "Enzyme in DNA replication", value: "B" },
      { label: "Protein-coding region", value: "C" },
      { label: "Sequence of tRNA bases", value: "D" }
    ],
    correctAnswer: "A",
    explanation: "A codon is a sequence of three bases on mRNA that specifies an amino acid."
  },
  {
    id: 9,
    question: "Transcription is the process where?",
    options: [
      { label: "RNA is translated into protein", value: "A" },
      { label: "Proteins are folded", value: "B" },
      { label: "DNA is copied into RNA", value: "C" },
      { label: "mRNA is converted to DNA", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "Transcription is the process where DNA is used as a template to make RNA."
  },
  {
    id: 10,
    question: "Where does translation occur?",
    options: [
      { label: "Nucleus", value: "A" },
      { label: "Ribosomes", value: "B" },
      { label: "Mitochondria", value: "C" },
      { label: "Golgi apparatus", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Translation, the process of making proteins from mRNA, occurs at ribosomes."
  },
  {
    id: 11,
    question: "A mutation is?",
    options: [
      { label: "Normal DNA replication", value: "A" },
      { label: "Correct DNA repair", value: "B" },
      { label: "Removal of a gene", value: "C" },
      { label: "Change in DNA sequence", value: "D" }
    ],
    correctAnswer: "D",
    explanation: "A mutation is a change in the DNA sequence that can affect gene function."
  },
  {
    id: 12,
    question: "Combining DNA from different sources is called?",
    options: [
      { label: "Recombinant DNA", value: "A" },
      { label: "Replication", value: "B" },
      { label: "Duplication", value: "C" },
      { label: "Insertion", value: "D" }
    ],
    correctAnswer: "A",
    explanation: "Recombinant DNA is DNA that has been formed by joining sequences from different sources."
  },
  {
    id: 13,
    question: "A plasmid is?",
    options: [
      { label: "Protein structure", value: "A" },
      { label: "Linear DNA in eukaryotes", value: "B" },
      { label: "Small circular DNA in bacteria", value: "C" },
      { label: "DNA mutation", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "A plasmid is a small, circular piece of DNA found in bacteria, separate from chromosomal DNA."
  },
  {
    id: 14,
    question: "Which statement about CRISPR is accurate?",
    options: [
      { label: "Randomly cuts DNA", value: "A" },
      { label: "Cuts DNA at specific sequences", value: "B" },
      { label: "Deletes chromosomes", value: "C" },
      { label: "Only found in humans", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "CRISPR is a precise gene-editing tool that can cut DNA at specific sequences."
  },
  {
    id: 15,
    question: "Which is a GMO application?",
    options: [
      { label: "Developing vaccines", value: "A" },
      { label: "Fossil fuel production", value: "B" },
      { label: "Pest-resistant crops", value: "C" },
      { label: "Solar panel efficiency", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "Pest-resistant crops are a common application of genetic modification technology."
  },
  {
    id: 16,
    question: "Ethical concern about GMOs?",
    options: [
      { label: "Cost of seeds", value: "A" },
      { label: "Increased food supply", value: "B" },
      { label: "Environmental impact and health risks", value: "C" },
      { label: "Improved nutrition", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "Environmental impact and potential health risks are major ethical concerns about GMOs."
  },
  {
    id: 17,
    question: "If an allele is dominant, it?",
    options: [
      { label: "Masks the recessive allele", value: "A" },
      { label: "Is weaker than recessive", value: "B" },
      { label: "Mutates into recessive", value: "C" },
      { label: "Cannot be inherited", value: "D" }
    ],
    correctAnswer: "A",
    explanation: "A dominant allele masks the expression of a recessive allele when both are present."
  },
  {
    id: 18,
    question: "Phenotype refers to?",
    options: [
      { label: "Genetic code", value: "A" },
      { label: "Observable traits", value: "B" },
      { label: "Hidden alleles", value: "C" },
      { label: "DNA sequence", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Phenotype refers to the observable physical or biochemical traits of an organism."
  },
  {
    id: 19,
    question: "A transgenic organism means?",
    options: [
      { label: "Has no mutations", value: "A" },
      { label: "Cannot reproduce", value: "B" },
      { label: "Contains genes from another species", value: "C" },
      { label: "Made of RNA only", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "A transgenic organism contains genes that have been transferred from another species."
  },
  {
    id: 20,
    question: "What is a promoter's role in gene expression?",
    options: [
      { label: "Ends transcription", value: "A" },
      { label: "Translates RNA", value: "B" },
      { label: "Replicates DNA", value: "C" },
      { label: "Starts transcription", value: "D" }
    ],
    correctAnswer: "D",
    explanation: "A promoter is a DNA sequence that signals where transcription should begin."
  }
];

export const posttestQuestions: Question[] = [
  {
    id: 1,
    question: "DNA abbreviation stands for?",
    options: [
      { label: "Deoxyribonucleic Acid", value: "A" },
      { label: "Dynamic Nucleic Acid", value: "B" },
      { label: "Double Nitrogen Arrangement", value: "C" },
      { label: "Deoxy Nucleic Atom", value: "D" }
    ],
    correctAnswer: "A"
  },
  {
    id: 2,
    question: "Components of a nucleotide?",
    options: [
      { label: "Protein, lipid, base", value: "A" },
      { label: "Sugar, phosphate, base", value: "B" },
      { label: "Starch, carbon, nitrogen", value: "C" },
      { label: "RNA, ribose, uracil", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 3,
    question: "Adenine pairs with which base?",
    options: [
      { label: "Guanine", value: "A" },
      { label: "Cytosine", value: "B" },
      { label: "Thymine", value: "C" },
      { label: "Uracil", value: "D" }
    ],
    correctAnswer: "C"
  },
  {
    id: 4,
    question: "What keeps DNA bases together?",
    options: [
      { label: "Hydrogen bonds", value: "A" },
      { label: "Ionic bonds", value: "B" },
      { label: "Peptide bonds", value: "C" },
      { label: "Disulfide bonds", value: "D" }
    ],
    correctAnswer: "A"
  },
  {
    id: 5,
    question: "Which sugar is in DNA?",
    options: [
      { label: "Glucose", value: "A" },
      { label: "Deoxyribose", value: "B" },
      { label: "Ribose", value: "C" },
      { label: "Lactose", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 6,
    question: "Where is DNA located in eukaryotes?",
    options: [
      { label: "Ribosomes", value: "A" },
      { label: "Cytoplasm", value: "B" },
      { label: "Nucleus", value: "C" },
      { label: "Mitochondria", value: "D" }
    ],
    correctAnswer: "C"
  },
  {
    id: 7,
    question: "Which best defines a gene?",
    options: [
      { label: "Protein chain", value: "A" },
      { label: "DNA segment coding for a protein", value: "B" },
      { label: "Chromosome set", value: "C" },
      { label: "mRNA transcript", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 8,
    question: "A sequence of 3 mRNA bases is called?",
    options: [
      { label: "Codon", value: "A" },
      { label: "Triplet protein", value: "B" },
      { label: "Base pair", value: "C" },
      { label: "Exon", value: "D" }
    ],
    correctAnswer: "A"
  },
  {
    id: 9,
    question: "Process that makes RNA from DNA?",
    options: [
      { label: "Replication", value: "A" },
      { label: "Translation", value: "B" },
      { label: "Transcription", value: "C" },
      { label: "Mutation", value: "D" }
    ],
    correctAnswer: "C"
  },
  {
    id: 10,
    question: "Ribosomes are responsible for?",
    options: [
      { label: "DNA synthesis", value: "A" },
      { label: "Translation of proteins", value: "B" },
      { label: "Transcription", value: "C" },
      { label: "Mutation repair", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 11,
    question: "Mutation best described as?",
    options: [
      { label: "DNA duplication", value: "A" },
      { label: "Corrected DNA sequence", value: "B" },
      { label: "Change in DNA sequence", value: "C" },
      { label: "Stable gene", value: "D" }
    ],
    correctAnswer: "C"
  },
  {
    id: 12,
    question: "Recombinant DNA means?",
    options: [
      { label: "DNA from two sources combined", value: "A" },
      { label: "Copying RNA", value: "B" },
      { label: "Mutation in sequence", value: "C" },
      { label: "Chromosome deletion", value: "D" }
    ],
    correctAnswer: "A"
  },
  {
    id: 13,
    question: "Plasmid is best described as?",
    options: [
      { label: "Enzyme for DNA cutting", value: "A" },
      { label: "Linear DNA", value: "B" },
      { label: "Circular bacterial DNA", value: "C" },
      { label: "RNA molecule", value: "D" }
    ],
    correctAnswer: "C"
  },
  {
    id: 14,
    question: "Conceptual fact about CRISPR?",
    options: [
      { label: "Random DNA editing", value: "A" },
      { label: "Precise DNA cutting tool", value: "B" },
      { label: "Protein folding", value: "C" },
      { label: "RNA splicing", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 15,
    question: "Beneficial use of GMO technology?",
    options: [
      { label: "Making vitamin-enriched rice", value: "A" },
      { label: "Producing fossil fuels", value: "B" },
      { label: "Building structures", value: "C" },
      { label: "Mining metals", value: "D" }
    ],
    correctAnswer: "A"
  },
  {
    id: 16,
    question: "Concern about GMO crops?",
    options: [
      { label: "Higher yields", value: "A" },
      { label: "Environmental/ethical impact", value: "B" },
      { label: "Increased nutrition", value: "C" },
      { label: "Lower costs", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 17,
    question: "Dominant allele means?",
    options: [
      { label: "Masks effect of recessive allele", value: "A" },
      { label: "Always mutates", value: "B" },
      { label: "Cannot be inherited", value: "C" },
      { label: "Same as phenotype", value: "D" }
    ],
    correctAnswer: "A"
  },
  {
    id: 18,
    question: "Which describes a phenotype?",
    options: [
      { label: "DNA sequence", value: "A" },
      { label: "Physical/observable traits", value: "B" },
      { label: "Genotype only", value: "C" },
      { label: "RNA structure", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 19,
    question: "A transgenic organism has?",
    options: [
      { label: "Extra chromosomes", value: "A" },
      { label: "Genes from other species", value: "B" },
      { label: "Only dominant alleles", value: "C" },
      { label: "No phenotype", value: "D" }
    ],
    correctAnswer: "B"
  },
  {
    id: 20,
    question: "A promoter in genetics is?",
    options: [
      { label: "Sequence that ends transcription", value: "A" },
      { label: "DNA sequence that starts transcription", value: "B" },
      { label: "RNA splicing site", value: "C" },
      { label: "Protein folding region", value: "D" }
    ],
    correctAnswer: "B"
  }
];
