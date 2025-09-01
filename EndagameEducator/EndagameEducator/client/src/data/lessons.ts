import { Dna, ArrowRightLeft, Shuffle, Settings, Sprout, LucideIcon } from "lucide-react";

export interface LessonData {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  icon: LucideIcon;
  gradient: string;
  duration: string;
  drillTitle: string;
  drillDescription: string;
  quizQuestions: Array<{
    id: number;
    question: string;
    options: { label: string; value: string }[];
    correctAnswer: string;
    explanation?: string;
  }>;
}

export const lessonsData: LessonData[] = [
  {
    id: 1,
    title: "DNA Structure & Components",
    subtitle: "Understanding the building blocks of life",
    icon: Dna,
    gradient: "from-primary to-accent",
    duration: "25 min",
    content: `
      <h3>What is DNA?</h3>
      <p>DNA (Deoxyribonucleic Acid) is the molecule that carries genetic information in living organisms. Think of it as the instruction manual for building and maintaining life.</p>
      
      <h3>The Double Helix Structure</h3>
      <p>DNA has a famous twisted ladder shape called a double helix. This structure was discovered by Watson and Crick in 1953, building on the work of Rosalind Franklin and others.</p>
      
      <h3>Nucleotides: The Building Blocks</h3>
      <p>DNA is made up of smaller units called nucleotides. Each nucleotide has three parts:</p>
      <ul>
        <li><strong>Sugar (Deoxyribose):</strong> The backbone of the DNA strand</li>
        <li><strong>Phosphate Group:</strong> Connects the sugar molecules together</li>
        <li><strong>Nitrogen Base:</strong> Contains the genetic information</li>
      </ul>
      
      <h3>The Four Bases</h3>
      <p>There are four nitrogen bases in DNA:</p>
      <ul>
        <li><strong>Adenine (A):</strong> Always pairs with Thymine</li>
        <li><strong>Thymine (T):</strong> Always pairs with Adenine</li>
        <li><strong>Guanine (G):</strong> Always pairs with Cytosine</li>
        <li><strong>Cytosine (C):</strong> Always pairs with Guanine</li>
      </ul>
      
      <h3>Base Pairing Rules</h3>
      <p>The bases follow strict pairing rules held together by hydrogen bonds:</p>
      <ul>
        <li>A-T pairs are held by 2 hydrogen bonds</li>
        <li>G-C pairs are held by 3 hydrogen bonds (making them stronger)</li>
      </ul>
      
      <p>This complementary base pairing is what allows DNA to replicate and pass genetic information to the next generation.</p>
    `,
    drillTitle: "Interactive DNA Builder",
    drillDescription: "Drag and drop nucleotides to build a correct DNA double helix. Practice base pairing rules!",
    quizQuestions: [
      {
        id: 1,
        question: "Which of the following is NOT a component of a DNA nucleotide?",
        options: [
          { label: "Deoxyribose sugar", value: "A" },
          { label: "Phosphate group", value: "B" },
          { label: "Nitrogen base", value: "C" },
          { label: "Amino acid", value: "D" }
        ],
        correctAnswer: "D",
        explanation: "Amino acids are the building blocks of proteins, not DNA nucleotides."
      },
      {
        id: 2,
        question: "How many hydrogen bonds hold an A-T base pair together?",
        options: [
          { label: "1", value: "A" },
          { label: "2", value: "B" },
          { label: "3", value: "C" },
          { label: "4", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "A-T base pairs are held together by 2 hydrogen bonds, while G-C pairs have 3."
      },
      {
        id: 3,
        question: "What shape does DNA form?",
        options: [
          { label: "Single helix", value: "A" },
          { label: "Double helix", value: "B" },
          { label: "Triple helix", value: "C" },
          { label: "Linear chain", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "DNA forms a double helix structure, like a twisted ladder."
      },
      {
        id: 4,
        question: "Which base would pair with Guanine (G)?",
        options: [
          { label: "Adenine (A)", value: "A" },
          { label: "Thymine (T)", value: "B" },
          { label: "Cytosine (C)", value: "C" },
          { label: "Uracil (U)", value: "D" }
        ],
        correctAnswer: "C",
        explanation: "Guanine always pairs with Cytosine in DNA."
      },
      {
        id: 5,
        question: "What is the sugar component in DNA called?",
        options: [
          { label: "Ribose", value: "A" },
          { label: "Deoxyribose", value: "B" },
          { label: "Glucose", value: "C" },
          { label: "Fructose", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "DNA contains deoxyribose sugar, which differs from RNA's ribose."
      }
    ]
  },
  {
    id: 2,
    title: "Central Dogma: DNA to Protein",
    subtitle: "From genes to traits through RNA",
    icon: ArrowRightLeft,
    gradient: "from-secondary to-purple-400",
    duration: "30 min",
    content: `
      <h3>The Central Dogma of Biology</h3>
      <p>The central dogma describes how genetic information flows from DNA to RNA to proteins. This process is fundamental to all life.</p>
      
      <h3>Step 1: Transcription (DNA → RNA)</h3>
      <p>Transcription is the process of copying genetic information from DNA into RNA:</p>
      <ul>
        <li>Takes place in the nucleus (in eukaryotes)</li>
        <li>RNA polymerase enzyme reads the DNA template</li>
        <li>Creates a complementary RNA copy</li>
        <li>RNA uses Uracil (U) instead of Thymine (T)</li>
      </ul>
      
      <h3>Types of RNA</h3>
      <ul>
        <li><strong>mRNA (messenger RNA):</strong> Carries genetic information to ribosomes</li>
        <li><strong>tRNA (transfer RNA):</strong> Brings amino acids to the ribosome</li>
        <li><strong>rRNA (ribosomal RNA):</strong> Part of ribosome structure</li>
      </ul>
      
      <h3>Step 2: Translation (RNA → Protein)</h3>
      <p>Translation converts the RNA message into a protein:</p>
      <ul>
        <li>Takes place at ribosomes</li>
        <li>mRNA is read in groups of three bases called codons</li>
        <li>Each codon specifies one amino acid</li>
        <li>tRNA molecules bring the correct amino acids</li>
      </ul>
      
      <h3>The Genetic Code</h3>
      <p>The genetic code is nearly universal across all life forms:</p>
      <ul>
        <li>64 possible codons (4³ combinations)</li>
        <li>Only 20 amino acids, so the code is redundant</li>
        <li>Start codon: AUG (codes for methionine)</li>
        <li>Stop codons: UAA, UAG, UGA</li>
      </ul>
    `,
    drillTitle: "Codon Translation Challenge",
    drillDescription: "Use the genetic code to translate mRNA codons into amino acids. Practice reading the genetic code!",
    quizQuestions: [
      {
        id: 1,
        question: "What is the first step in gene expression?",
        options: [
          { label: "Translation", value: "A" },
          { label: "Transcription", value: "B" },
          { label: "Replication", value: "C" },
          { label: "Mutation", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "Transcription is the first step, where DNA is copied into RNA."
      },
      {
        id: 2,
        question: "Where does transcription occur in eukaryotic cells?",
        options: [
          { label: "Cytoplasm", value: "A" },
          { label: "Nucleus", value: "B" },
          { label: "Ribosomes", value: "C" },
          { label: "Mitochondria", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "In eukaryotes, transcription occurs in the nucleus where DNA is located."
      },
      {
        id: 3,
        question: "How many bases make up a codon?",
        options: [
          { label: "2", value: "A" },
          { label: "3", value: "B" },
          { label: "4", value: "C" },
          { label: "5", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "A codon consists of three consecutive bases on mRNA."
      },
      {
        id: 4,
        question: "Which RNA molecule carries amino acids to the ribosome?",
        options: [
          { label: "mRNA", value: "A" },
          { label: "tRNA", value: "B" },
          { label: "rRNA", value: "C" },
          { label: "snRNA", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "tRNA (transfer RNA) carries amino acids to the ribosome during translation."
      },
      {
        id: 5,
        question: "What is the start codon in the genetic code?",
        options: [
          { label: "UAA", value: "A" },
          { label: "AUG", value: "B" },
          { label: "UGA", value: "C" },
          { label: "UAG", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "AUG is the start codon that begins protein synthesis and codes for methionine."
      }
    ]
  },
  {
    id: 3,
    title: "Genes, Heredity & Mutations",
    subtitle: "How traits are passed and changed",
    icon: Shuffle,
    gradient: "from-accent to-cyan-400",
    duration: "28 min",
    content: `
      <h3>What is a Gene?</h3>
      <p>A gene is a specific sequence of DNA that codes for a functional product, usually a protein. Genes are the basic units of heredity.</p>
      
      <h3>Chromosomes and Genomes</h3>
      <ul>
        <li><strong>Chromosome:</strong> A structure containing many genes and DNA</li>
        <li><strong>Genome:</strong> The complete set of DNA in an organism</li>
        <li><strong>Humans have:</strong> 23 pairs of chromosomes (46 total)</li>
        <li><strong>Each gene:</strong> Has a specific location (locus) on a chromosome</li>
      </ul>
      
      <h3>Alleles and Inheritance</h3>
      <p>Different versions of the same gene are called alleles:</p>
      <ul>
        <li><strong>Dominant alleles:</strong> Mask the expression of recessive alleles</li>
        <li><strong>Recessive alleles:</strong> Only expressed when no dominant allele is present</li>
        <li><strong>Homozygous:</strong> Two identical alleles (AA or aa)</li>
        <li><strong>Heterozygous:</strong> Two different alleles (Aa)</li>
      </ul>
      
      <h3>Genotype vs. Phenotype</h3>
      <ul>
        <li><strong>Genotype:</strong> The genetic makeup (DNA sequence)</li>
        <li><strong>Phenotype:</strong> The observable traits (what you see)</li>
        <li><strong>Example:</strong> Brown eyes (phenotype) might result from BB or Bb genotype</li>
      </ul>
      
      <h3>Mutations: Changes in DNA</h3>
      <p>Mutations are changes in the DNA sequence that can occur naturally or be induced:</p>
      
      <h4>Types of Mutations:</h4>
      <ul>
        <li><strong>Point mutations:</strong> Single base changes</li>
        <li><strong>Insertions:</strong> Adding extra bases</li>
        <li><strong>Deletions:</strong> Removing bases</li>
        <li><strong>Chromosomal:</strong> Large-scale changes</li>
      </ul>
      
      <h4>Effects of Mutations:</h4>
      <ul>
        <li><strong>Silent:</strong> No change in protein (redundant genetic code)</li>
        <li><strong>Missense:</strong> Different amino acid in protein</li>
        <li><strong>Nonsense:</strong> Premature stop codon</li>
        <li><strong>Frameshift:</strong> Changes reading frame of codons</li>
      </ul>
      
      <p><strong>Important:</strong> Not all mutations are harmful! Some are neutral or even beneficial for evolution.</p>
    `,
    drillTitle: "Mutation Simulator",
    drillDescription: "Observe how different types of mutations affect protein production. See the immediate impact!",
    quizQuestions: [
      {
        id: 1,
        question: "What is the difference between genotype and phenotype?",
        options: [
          { label: "Genotype is observable, phenotype is hidden", value: "A" },
          { label: "Genotype is genetic makeup, phenotype is observable traits", value: "B" },
          { label: "They are the same thing", value: "C" },
          { label: "Genotype is proteins, phenotype is DNA", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "Genotype refers to the genetic makeup (DNA), while phenotype refers to observable traits."
      },
      {
        id: 2,
        question: "A heterozygous individual has:",
        options: [
          { label: "Two identical alleles", value: "A" },
          { label: "Two different alleles", value: "B" },
          { label: "No alleles", value: "C" },
          { label: "Only dominant alleles", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "Heterozygous means having two different alleles for the same gene (e.g., Aa)."
      },
      {
        id: 3,
        question: "A mutation that changes one amino acid in a protein is called:",
        options: [
          { label: "Silent mutation", value: "A" },
          { label: "Missense mutation", value: "B" },
          { label: "Nonsense mutation", value: "C" },
          { label: "Frameshift mutation", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "A missense mutation results in a different amino acid being incorporated into the protein."
      },
      {
        id: 4,
        question: "How many chromosomes do humans typically have?",
        options: [
          { label: "23", value: "A" },
          { label: "46", value: "B" },
          { label: "48", value: "C" },
          { label: "92", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "Humans have 46 chromosomes arranged in 23 pairs."
      },
      {
        id: 5,
        question: "Which type of mutation would most likely have the greatest effect on a protein?",
        options: [
          { label: "Silent mutation", value: "A" },
          { label: "Missense mutation", value: "B" },
          { label: "Frameshift mutation", value: "C" },
          { label: "Point mutation", value: "D" }
        ],
        correctAnswer: "C",
        explanation: "Frameshift mutations change the reading frame, affecting all amino acids downstream."
      }
    ]
  },
  {
    id: 4,
    title: "Genetic Engineering Concepts",
    subtitle: "Tools and techniques for modifying genes",
    icon: Settings,
    gradient: "from-orange-400 to-red-400",
    duration: "35 min",
    content: `
      <h3>What is Genetic Engineering?</h3>
      <p>Genetic engineering is the direct manipulation of an organism's genes using biotechnology. It allows scientists to add, remove, or modify specific genes.</p>
      
      <h3>Key Tools and Concepts</h3>
      
      <h4>1. Restriction Enzymes</h4>
      <ul>
        <li>Molecular scissors that cut DNA at specific sequences</li>
        <li>Create sticky ends or blunt ends</li>
        <li>Named after bacteria they come from (e.g., EcoRI)</li>
      </ul>
      
      <h4>2. DNA Ligase</h4>
      <ul>
        <li>Molecular glue that joins DNA fragments</li>
        <li>Seals the gaps between DNA pieces</li>
        <li>Essential for creating recombinant DNA</li>
      </ul>
      
      <h4>3. Plasmids</h4>
      <ul>
        <li>Small, circular DNA molecules in bacteria</li>
        <li>Can replicate independently of chromosomal DNA</li>
        <li>Used as vectors to carry foreign genes</li>
        <li>Often contain antibiotic resistance genes as markers</li>
      </ul>
      
      <h3>Recombinant DNA Technology</h3>
      <p>The process of combining DNA from different sources:</p>
      <ol>
        <li>Cut DNA with restriction enzymes</li>
        <li>Insert gene of interest into vector (plasmid)</li>
        <li>Transform bacteria with recombinant plasmid</li>
        <li>Select successful transformants</li>
        <li>Clone and express the gene</li>
      </ol>
      
      <h3>CRISPR: A Revolutionary Tool</h3>
      <p>CRISPR-Cas9 is a precise gene-editing system:</p>
      <ul>
        <li><strong>Guide RNA:</strong> Directs the system to the target sequence</li>
        <li><strong>Cas9 protein:</strong> Acts as molecular scissors</li>
        <li><strong>Precision:</strong> Can edit specific locations in the genome</li>
        <li><strong>Applications:</strong> Research, medicine, agriculture</li>
      </ul>
      
      <h3>Gene Delivery Methods</h3>
      <ul>
        <li><strong>Transformation:</strong> Direct uptake of DNA by cells</li>
        <li><strong>Transfection:</strong> Using chemicals or electricity</li>
        <li><strong>Viral vectors:</strong> Modified viruses carry genes</li>
        <li><strong>Microinjection:</strong> Direct injection into cells</li>
      </ul>
      
      <h3>Important Considerations</h3>
      <p><strong>Safety and Ethics:</strong> All genetic engineering must be conducted in appropriate biosafety facilities with proper oversight. This lesson provides conceptual understanding only.</p>
    `,
    drillTitle: "Virtual CRISPR Designer",
    drillDescription: "Design guide RNAs and explore conceptual gene editing without real laboratory procedures.",
    quizQuestions: [
      {
        id: 1,
        question: "What is the function of restriction enzymes?",
        options: [
          { label: "Join DNA fragments together", value: "A" },
          { label: "Cut DNA at specific sequences", value: "B" },
          { label: "Replicate DNA", value: "C" },
          { label: "Translate mRNA", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "Restriction enzymes cut DNA at specific recognition sequences."
      },
      {
        id: 2,
        question: "What is a plasmid?",
        options: [
          { label: "A type of protein", value: "A" },
          { label: "Small circular DNA in bacteria", value: "B" },
          { label: "A restriction enzyme", value: "C" },
          { label: "A type of chromosome", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "Plasmids are small, circular DNA molecules found in bacteria."
      },
      {
        id: 3,
        question: "In CRISPR-Cas9, what guides the system to the target DNA sequence?",
        options: [
          { label: "DNA ligase", value: "A" },
          { label: "Guide RNA", value: "B" },
          { label: "Restriction enzyme", value: "C" },
          { label: "Plasmid", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "Guide RNA directs the CRISPR-Cas9 system to the specific target sequence."
      },
      {
        id: 4,
        question: "What is recombinant DNA?",
        options: [
          { label: "DNA that has been replicated", value: "A" },
          { label: "DNA combined from different sources", value: "B" },
          { label: "Mutated DNA", value: "C" },
          { label: "DNA without genes", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "Recombinant DNA is formed by combining DNA from different sources."
      },
      {
        id: 5,
        question: "Why are antibiotic resistance genes often included in plasmids used for genetic engineering?",
        options: [
          { label: "To make bacteria healthier", value: "A" },
          { label: "To select cells that took up the plasmid", value: "B" },
          { label: "To cut DNA", value: "C" },
          { label: "To produce proteins", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "Antibiotic resistance genes serve as selectable markers to identify successfully transformed cells."
      }
    ]
  },
  {
    id: 5,
    title: "GMO Applications & Ethics",
    subtitle: "Real-world applications and considerations",
    icon: Sprout,
    gradient: "from-green-400 to-emerald-500",
    duration: "30 min",
    content: `
      <h3>What are GMOs?</h3>
      <p>Genetically Modified Organisms (GMOs) are organisms whose genetic material has been altered using genetic engineering techniques. These modifications can introduce new traits or enhance existing ones.</p>
      
      <h3>Medical Applications</h3>
      
      <h4>Pharmaceutical Production</h4>
      <ul>
        <li><strong>Human insulin:</strong> Produced in bacteria and yeast</li>
        <li><strong>Growth hormone:</strong> Made in genetically modified bacteria</li>
        <li><strong>Blood clotting factors:</strong> For treating hemophilia</li>
        <li><strong>Vaccines:</strong> Safer vaccine production</li>
      </ul>
      
      <h4>Gene Therapy</h4>
      <ul>
        <li>Treating genetic disorders by introducing healthy genes</li>
        <li>Cancer immunotherapy</li>
        <li>Treating inherited diseases</li>
      </ul>
      
      <h3>Agricultural Applications</h3>
      
      <h4>Crop Improvements</h4>
      <ul>
        <li><strong>Pest resistance:</strong> Bt crops produce natural pesticides</li>
        <li><strong>Herbicide tolerance:</strong> Crops survive weed-killing chemicals</li>
        <li><strong>Disease resistance:</strong> Protection against viral and bacterial diseases</li>
        <li><strong>Enhanced nutrition:</strong> Golden rice with vitamin A</li>
        <li><strong>Extended shelf life:</strong> Flavr Savr tomatoes</li>
      </ul>
      
      <h4>Environmental Benefits</h4>
      <ul>
        <li>Reduced pesticide use</li>
        <li>Improved soil conservation</li>
        <li>Drought tolerance for climate change</li>
        <li>Increased crop yields on existing farmland</li>
      </ul>
      
      <h3>Industrial Applications</h3>
      <ul>
        <li><strong>Biofuels:</strong> Engineered microorganisms produce ethanol</li>
        <li><strong>Biodegradable plastics:</strong> From modified bacteria</li>
        <li><strong>Enzymes:</strong> For detergents and food processing</li>
        <li><strong>Bioremediation:</strong> Cleaning up environmental pollution</li>
      </ul>
      
      <h3>Ethical Considerations</h3>
      
      <h4>Safety Concerns</h4>
      <ul>
        <li>Food safety and allergenicity</li>
        <li>Environmental impact on ecosystems</li>
        <li>Resistance development in pests</li>
        <li>Gene flow to wild relatives</li>
      </ul>
      
      <h4>Social and Economic Issues</h4>
      <ul>
        <li>Corporate control of seeds</li>
        <li>Impact on small farmers</li>
        <li>Labeling and consumer choice</li>
        <li>Access to technology in developing countries</li>
      </ul>
      
      <h4>Regulatory Framework</h4>
      <ul>
        <li>Rigorous testing before approval</li>
        <li>Multiple agencies involved (FDA, EPA, USDA)</li>
        <li>Different regulations worldwide</li>
        <li>Ongoing monitoring and assessment</li>
      </ul>
      
      <h3>Balanced Perspective</h3>
      <p>GMO technology offers significant benefits but requires careful consideration of risks. Scientific evidence, ethical reflection, and public dialogue are all important for making informed decisions about GMO use.</p>
      
      <p><strong>The goal is sustainable, safe, and equitable solutions to global challenges like food security, disease, and environmental protection.</strong></p>
    `,
    drillTitle: "Ethics Decision Simulator",
    drillDescription: "Navigate real-world scenarios involving GMO decisions. Consider multiple stakeholder perspectives.",
    quizQuestions: [
      {
        id: 1,
        question: "Which was one of the first GMO pharmaceuticals produced?",
        options: [
          { label: "Penicillin", value: "A" },
          { label: "Human insulin", value: "B" },
          { label: "Aspirin", value: "C" },
          { label: "Vitamin C", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "Human insulin was one of the first successfully produced GMO pharmaceuticals."
      },
      {
        id: 2,
        question: "What is Golden Rice designed to address?",
        options: [
          { label: "Pest resistance", value: "A" },
          { label: "Vitamin A deficiency", value: "B" },
          { label: "Drought tolerance", value: "C" },
          { label: "Herbicide resistance", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "Golden Rice is genetically modified to produce beta-carotene, addressing vitamin A deficiency."
      },
      {
        id: 3,
        question: "Which is a potential environmental concern about GMO crops?",
        options: [
          { label: "Increased crop yields", value: "A" },
          { label: "Gene flow to wild relatives", value: "B" },
          { label: "Better nutrition", value: "C" },
          { label: "Reduced pesticide use", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "Gene flow from GMO crops to wild relatives is a legitimate environmental concern."
      },
      {
        id: 4,
        question: "Bt crops are genetically modified to:",
        options: [
          { label: "Resist herbicides", value: "A" },
          { label: "Produce natural pesticides", value: "B" },
          { label: "Grow faster", value: "C" },
          { label: "Resist viruses", value: "D" }
        ],
        correctAnswer: "B",
        explanation: "Bt crops produce proteins from Bacillus thuringiensis that act as natural pesticides."
      },
      {
        id: 5,
        question: "Which stakeholder perspective is important in GMO decision-making?",
        options: [
          { label: "Scientists only", value: "A" },
          { label: "Farmers only", value: "B" },
          { label: "Consumers only", value: "C" },
          { label: "All stakeholders including scientists, farmers, consumers, and regulators", value: "D" }
        ],
        correctAnswer: "D",
        explanation: "GMO decisions should consider perspectives from all stakeholders for balanced outcomes."
      }
    ]
  }
];
