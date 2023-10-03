import { useState } from "react";
import { stemmer } from "https://esm.sh/stemmer@2";
import LoadingButton from "./components/loadingbutton";

export default function App() {
  const [main, setMain] = useState("");
  const [compare, setCompare] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultFound, setResultFound] = useState(false);

  const [matchWords, setMatchWWords] = useState(0);
  const [matchSynonyms, setMatchSynonyms] = useState(0);
  const [matchAntonyms, setMatchAntonyms] = useState(0);
  const [citationCount, setCitationCount] = useState(0);

  const [totalTokens, setTotalTokens] = useState(0);
  const [totalFiltered, setTotalFiltered] = useState(0);
  const [totalSentences, setTotalSentences] = useState(0);

  const [similarities, setSimilarities] = useState([]);

  const stopwords = [
    "a",
    "able",
    "about",
    "above",
    "abst",
    "accordance",
    "according",
    "accordingly",
    "across",
    "act",
    "actually",
    "added",
    "adj",
    "affected",
    "affecting",
    "affects",
    "after",
    "afterwards",
    "again",
    "against",
    "ah",
    "all",
    "almost",
    "alone",
    "along",
    "already",
    "also",
    "although",
    "always",
    "am",
    "among",
    "amongst",
    "an",
    "and",
    "announce",
    "another",
    "any",
    "anybody",
    "anyhow",
    "anymore",
    "anyone",
    "anything",
    "anyway",
    "anyways",
    "anywhere",
    "apparently",
    "approximately",
    "are",
    "aren",
    "arent",
    "arise",
    "around",
    "as",
    "aside",
    "ask",
    "asking",
    "at",
    "auth",
    "available",
    "away",
    "awfully",
    "b",
    "back",
    "be",
    "became",
    "because",
    "become",
    "becomes",
    "becoming",
    "been",
    "before",
    "beforehand",
    "begin",
    "beginning",
    "beginnings",
    "begins",
    "behind",
    "being",
    "believe",
    "below",
    "beside",
    "besides",
    "between",
    "beyond",
    "biol",
    "both",
    "brief",
    "briefly",
    "but",
    "by",
    "c",
    "ca",
    "came",
    "can",
    "cannot",
    "can't",
    "cause",
    "causes",
    "certain",
    "certainly",
    "co",
    "com",
    "come",
    "comes",
    "contain",
    "containing",
    "contains",
    "could",
    "couldnt",
    "d",
    "date",
    "did",
    "didn't",
    "different",
    "do",
    "does",
    "doesn't",
    "doing",
    "done",
    "don't",
    "down",
    "downwards",
    "due",
    "during",
    "e",
    "each",
    "ed",
    "edu",
    "effect",
    "eg",
    "eight",
    "eighty",
    "either",
    "else",
    "elsewhere",
    "end",
    "ending",
    "enough",
    "especially",
    "et",
    "et-al",
    "etc",
    "even",
    "ever",
    "every",
    "everybody",
    "everyone",
    "everything",
    "everywhere",
    "ex",
    "except",
    "f",
    "far",
    "few",
    "ff",
    "fifth",
    "first",
    "five",
    "fix",
    "followed",
    "following",
    "follows",
    "for",
    "former",
    "formerly",
    "forth",
    "found",
    "four",
    "from",
    "further",
    "furthermore",
    "g",
    "gave",
    "get",
    "gets",
    "getting",
    "give",
    "given",
    "gives",
    "giving",
    "go",
    "goes",
    "gone",
    "got",
    "gotten",
    "h",
    "had",
    "happens",
    "hardly",
    "has",
    "hasn't",
    "have",
    "haven't",
    "having",
    "he",
    "hed",
    "hence",
    "her",
    "here",
    "hereafter",
    "hereby",
    "herein",
    "heres",
    "hereupon",
    "hers",
    "herself",
    "hes",
    "hi",
    "hid",
    "him",
    "himself",
    "his",
    "hither",
    "home",
    "how",
    "howbeit",
    "however",
    "hundred",
    "i",
    "id",
    "ie",
    "if",
    "i'll",
    "im",
    "immediate",
    "immediately",
    "importance",
    "important",
    "in",
    "inc",
    "indeed",
    "index",
    "information",
    "instead",
    "into",
    "invention",
    "inward",
    "is",
    "isn't",
    "it",
    "itd",
    "it'll",
    "its",
    "itself",
    "i've",
    "j",
    "just",
    "k",
    "keep	keeps",
    "kept",
    "kg",
    "km",
    "know",
    "known",
    "knows",
    "l",
    "largely",
    "last",
    "lately",
    "later",
    "latter",
    "latterly",
    "least",
    "less",
    "lest",
    "let",
    "lets",
    "like",
    "liked",
    "likely",
    "line",
    "little",
    "'ll",
    "look",
    "looking",
    "looks",
    "ltd",
    "m",
    "made",
    "mainly",
    "make",
    "makes",
    "many",
    "may",
    "maybe",
    "me",
    "mean",
    "means",
    "meantime",
    "meanwhile",
    "merely",
    "mg",
    "might",
    "million",
    "miss",
    "ml",
    "more",
    "moreover",
    "most",
    "mostly",
    "mr",
    "mrs",
    "much",
    "mug",
    "must",
    "my",
    "myself",
    "n",
    "na",
    "name",
    "namely",
    "nay",
    "nd",
    "near",
    "nearly",
    "necessarily",
    "necessary",
    "need",
    "needs",
    "neither",
    "never",
    "nevertheless",
    "new",
    "next",
    "nine",
    "ninety",
    "nobody",
    "none",
    "nonetheless",
    "noone",
    "normally",
    "nos",
    "noted",
    "nothing",
    "now",
    "nowhere",
    "o",
    "obtain",
    "obtained",
    "obviously",
    "of",
    "off",
    "often",
    "oh",
    "ok",
    "okay",
    "old",
    "omitted",
    "on",
    "once",
    "one",
    "ones",
    "only",
    "onto",
    "or",
    "ord",
    "other",
    "others",
    "otherwise",
    "ought",
    "our",
    "ours",
    "ourselves",
    "out",
    "outside",
    "over",
    "overall",
    "owing",
    "own",
    "p",
    "page",
    "pages",
    "part",
    "particular",
    "particularly",
    "past",
    "per",
    "perhaps",
    "placed",
    "please",
    "plus",
    "poorly",
    "possible",
    "possibly",
    "potentially",
    "pp",
    "predominantly",
    "present",
    "previously",
    "primarily",
    "probably",
    "promptly",
    "proud",
    "provides",
    "put",
    "q",
    "que",
    "quickly",
    "quite",
    "qv",
    "r",
    "ran",
    "rather",
    "rd",
    "re",
    "readily",
    "really",
    "recent",
    "recently",
    "ref",
    "refs",
    "regarding",
    "regardless",
    "regards",
    "related",
    "relatively",
    "research",
    "respectively",
    "resulted",
    "resulting",
    "results",
    "right",
    "run",
    "s",
    "said",
    "same",
    "saw",
    "say",
    "saying",
    "says",
    "sec",
    "section",
    "see",
    "seeing",
    "seem",
    "seemed",
    "seeming",
    "seems",
    "seen",
    "self",
    "selves",
    "sent",
    "seven",
    "several",
    "shall",
    "she",
    "shed",
    "she'll",
    "shes",
    "should",
    "shouldn't",
    "show",
    "showed",
    "shown",
    "showns",
    "shows",
    "significant",
    "significantly",
    "similar",
    "similarly",
    "since",
    "six",
    "slightly",
    "so",
    "some",
    "somebody",
    "somehow",
    "someone",
    "somethan",
    "something",
    "sometime",
    "sometimes",
    "somewhat",
    "somewhere",
    "soon",
    "sorry",
    "specifically",
    "specified",
    "specify",
    "specifying",
    "still",
    "stop",
    "strongly",
    "sub",
    "substantially",
    "successfully",
    "such",
    "sufficiently",
    "suggest",
    "sup",
    "sure	t",
    "take",
    "taken",
    "taking",
    "tell",
    "tends",
    "th",
    "than",
    "thank",
    "thanks",
    "thanx",
    "that",
    "that'll",
    "thats",
    "that've",
    "the",
    "their",
    "theirs",
    "them",
    "themselves",
    "then",
    "thence",
    "there",
    "thereafter",
    "thereby",
    "thered",
    "therefore",
    "therein",
    "there'll",
    "thereof",
    "therere",
    "theres",
    "thereto",
    "thereupon",
    "there've",
    "these",
    "they",
    "theyd",
    "they'll",
    "theyre",
    "they've",
    "think",
    "this",
    "those",
    "thou",
    "though",
    "thoughh",
    "thousand",
    "throug",
    "through",
    "throughout",
    "thru",
    "thus",
    "til",
    "tip",
    "to",
    "together",
    "too",
    "took",
    "toward",
    "towards",
    "tried",
    "tries",
    "truly",
    "try",
    "trying",
    "ts",
    "twice",
    "two",
    "u",
    "un",
    "under",
    "unfortunately",
    "unless",
    "unlike",
    "unlikely",
    "until",
    "unto",
    "up",
    "upon",
    "ups",
    "us",
    "use",
    "used",
    "useful",
    "usefully",
    "usefulness",
    "uses",
    "using",
    "usually",
    "v",
    "value",
    "various",
    "'ve",
    "very",
    "via",
    "viz",
    "vol",
    "vols",
    "vs",
    "w",
    "want",
    "wants",
    "was",
    "wasnt",
    "way",
    "we",
    "wed",
    "welcome",
    "we'll",
    "went",
    "were",
    "werent",
    "we've",
    "what",
    "whatever",
    "what'll",
    "whats",
    "when",
    "whence",
    "whenever",
    "where",
    "whereafter",
    "whereas",
    "whereby",
    "wherein",
    "wheres",
    "whereupon",
    "wherever",
    "whether",
    "which",
    "while",
    "whim",
    "whither",
    "who",
    "whod",
    "whoever",
    "whole",
    "who'll",
    "whom",
    "whomever",
    "whos",
    "whose",
    "why",
    "widely",
    "willing",
    "wish",
    "with",
    "within",
    "without",
    "wont",
    "words",
    "world",
    "would",
    "wouldnt",
    "www",
    "x",
    "y",
    "yes",
    "yet",
    "you",
    "youd",
    "you'll",
    "your",
    "youre",
    "yours",
    "yourself",
    "yourselves",
    "you've",
    "z",
    "zero",
  ];

  // Scan Plagiarism Button Entry
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Computes rolling hashes for a given string
    function computeRollingHashes(str, k, p, b) {
      const hashes = [];
      let hash = 0;
      let power = 1;

      for (let i = 0; i < str.length; i++) {
        // Compute hash for k-gram starting at position i
        hash = (hash * b + str.charCodeAt(i)) % p;
        if (i >= k - 1) {
          hashes.push(hash);
          // Remove the contribution of the (i-k)-th character from the hash
          hash = (hash - power * str.charCodeAt(i - k + 1)) % p;
          if (hash < 0) {
            hash += p;
          }
        } else {
          power = (power * b) % p;
        }
      }

      return hashes;
    }

    function findStringSimilarities(str1, str2, k, p, b) {
      const hashes1 = computeRollingHashes(str1, k, p, b);
      const hashes2 = computeRollingHashes(str2, k, p, b);
      const hashes1list = [];
      const hashes2list = [];

      const similarities = [];
      const hashset2 = new Set(hashes2);

      for (let i = 0; i <= hashes1.length - k; i++) {
        const h1 = hashes1[i];
        const h2 = hashes1[i + k - 1];
        const kgram = str1.substring(i, i + k);

        hashes1list.push(h1);
        hashes2list.push(h2);

        if (hashset2.has(h1) && hashset2.has(h2)) {
          for (let j = 0; j <= hashes2.length - k; j++) {
            if (h1 === hashes2[j] && h2 === hashes2[j + k - 1]) {
              const kgram2 = str2.substring(j, j + k);
              if (kgram === kgram2) {
                similarities.push(i);
                break;
              }
            }
          }
        }
      }
      console.log(similarities);
      console.log(hashes1list);
      console.log(hashes2list);
      const plagrate =
        ((2 * similarities.length) /
          (hashes1list.length + hashes2list.length)) *
        100;
      console.log(plagrate);

      return plagrate;
    }

    /* CASE FOLDING
    Converting the whole chunk of text to 
    lowercase in order to make text comparison not case sensitive */
    const mainFolded = main.toLowerCase();
    const compareFolded = compare.toLowerCase();

    /* TOKENIZATION
    Splitting the whole chunk of text to strips of text stored in
    an array. It will iterate through the text and every time it sees
    a space (" "), it will record and move forward until the last word */
    const mainTokenized = mainFolded.split(" ");
    const compareTokenized = compareFolded.split(" ");

    /* Total Sentences is where the number of citations found will 
    be deducted to obtain percent plagiarism.*/
    const totalSentence = mainFolded.split(".");

    /* FILTERING STOP WORDS (except no, not, nor)
    Removing commond words from the array of tokenized text that do not
    have necessary meaning individually to narrow down comparison points
    moving forward. This will be the most used array throughout the comparison
     */
    const mainFiltered = [];
    const compareFiltered = [];

    for (let i = 0; i < mainTokenized.length; i++) {
      // if the current word is a common word do not push and re-iterate
      if (stopwords.includes(mainTokenized[i])) {
        continue;
      } else {
        // else if not a common word push it before re-iterating
        // know first if it has . or , to remove it before pushing
        for (
          let j = mainTokenized[i].length - 1;
          j < mainTokenized[i].length;
          j++
        ) {
          if (mainTokenized[i][j] === ".") {
            mainFiltered.push(mainTokenized[i].split(".").join(""));
          } else if (mainTokenized[i][j] === ",") {
            mainFiltered.push(mainTokenized[i].split(",").join(""));
          } else {
            mainFiltered.push(mainTokenized[i]);
          }
        }
      }
    }

    for (let i = 0; i < compareTokenized.length; i++) {
      if (stopwords.includes(compareTokenized[i])) {
        continue;
      } else {
        for (
          let j = compareTokenized[i].length - 1;
          j < compareTokenized[i].length;
          j++
        ) {
          if (compareTokenized[i][j] === ".") {
            compareFiltered.push(compareTokenized[i].split(".").join(""));
          } else if (compareTokenized[i][j] === ",") {
            compareFiltered.push(compareTokenized[i].split(",").join(""));
          } else {
            compareFiltered.push(compareTokenized[i]);
          }
        }
      }
    }

    /* STEMMING
    Optional step for preprocessing since the stemmer algorithms available
    provide inaccurate results making the comparison more error prone and
    have more true negatives or false positives */
    const mainStemmed = [];
    const compareStemmed = [];

    // stemmer function imported tranforming them to root word
    for (let i = 0; i < mainFiltered.length; i++) {
      try {
        const response = await fetch(
          "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/" +
            mainFiltered[i] +
            "?key=c793ce52-c8aa-4ac8-aba7-5b1239c8c062"
        );
        const json = await response.json();
        mainStemmed.push(json[0].meta.id);
      } catch (error) {
        console.log(error);
      }
    }

    for (let i = 0; i < compareFiltered.length; i++) {
      try {
        const response = await fetch(
          "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/" +
            compareFiltered[i] +
            "?key=c793ce52-c8aa-4ac8-aba7-5b1239c8c062"
        );
        const json = await response.json();
        compareStemmed.push(json[0].meta.id);
      } catch (error) {
        console.log(error);
      }
    }

    // Stemmer Substitute
    // for (let i = 0; i < compareFiltered.length; i++) {
    //   compareStemmed.push(stemmer(compareFiltered[i]));
    // }

    /* RABIN-KARP ALGORITHM
    Getting the exact phrases then highlighting where it occured.
    This would help visualize where the plagiarism occured within
    the sea of text. */

    const similarities = findStringSimilarities(
      mainFiltered.join(""),
      compareFiltered.join(""),
      5,
      101,
      256
    );

    setSimilarities(similarities);

    /* SOP 1 AND SOP 2
    Synonym, Negated Antonym, and Exact Word Counter
    The entirety of SOP 1 can be solved by this three metrics as during the
    content analysis summation of this divided by the total length of
    the whole text originally will compute the percent of plagiarism
    While for SOP 2 since the exact word counter can count how many words
    was used from both text and pattern even re-arranging the sentence structure
    cannot move past the detection because in re-arranging the plagiarizer will
    either use the same words (falling in word counting) or changing them
    to their synonyms while changing the structure (falling in synonmy matching)
    Making it inevitable to be detected throughout the whole text*/
    let wordMatch = 0;
    let synonymMatch = 0;
    let negatedMatch = 0;

    // exact word match checking between text and pattern
    for (let i = 0; i < mainFiltered.length; i++) {
      if (compareFiltered.includes(mainFiltered[i])) {
        wordMatch++;
      }
    }

    // synonyms/negated antonym
    for (let i = 0; i < compareFiltered.length; i++) {
      // fetching the synonyms/antonyms api for results
      try {
        const response = await fetch(
          "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/" +
            compareFiltered[i] +
            "?key=c793ce52-c8aa-4ac8-aba7-5b1239c8c062"
        );
        const json = await response.json();

        // checking synonyms if exist and added extra condition since synonyms include the word itself
        for (let j = 0; j < json[0].meta.syns.length; j++) {
          for (let k = 0; k < json[0].meta.syns[j].length; k++) {
            if (mainFiltered.includes(json[0].meta.syns[j][k])) {
              synonymMatch++;
            }
          }
        }

        // checking negated antonym by sliding two at time per word looking for "not" followed by a specific antonym
        for (let i = 0; i < mainFiltered.length; i++) {
          for (let j = 0; j < json[0].meta.ants.length; j++) {
            for (let k = 0; k < json[0].meta.ants[j].length; k++) {
              if (
                mainFiltered[i] === "not" &&
                mainFiltered[i + 1] === json[0].meta.ants[j][k]
              ) {
                negatedMatch++;
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    /* CITATION
    Citation counting to know how many of the content is plagiarized
    or not depending if it has a citation. We will count the number of
    total citations for documentation and result showing */
    // APA and Harvard = /\([a-zA-z(\s|\.)]+\,\s[0-9)]+/g
    // MLA = /\([a-zA-Z(\s|\.)?]+\s?[0-9]+\-[0-9)]+/g
    // CHICAGO = /\([a-zA-Z(\s|\.)]+\s[0-9)]+\,\s[0-9]+(\-[0-9)]+)?/g
    // Quotation = /"(.*?)"/g
    // General = /([0-9]+)\)+/g

    let citation = 0;

    for (let i = 0; i < mainTokenized.length; i++) {
      if (
        /([0-9]+)\)+/g.test(mainTokenized[i]) |
        /"(.*?)"/g.test(mainTokenized[i])
      ) {
        citation++;
      }
    }

    setMatchWWords(wordMatch);
    setMatchSynonyms(synonymMatch);
    setMatchAntonyms(negatedMatch);
    setCitationCount(citation);

    setTotalSentences(totalSentence.length);
    setTotalTokens(mainTokenized.length);
    setTotalFiltered(mainFiltered.length);

    setResultFound(true);
    setLoading(false);

    // console.log("Folded Text 1" + "\n" + mainFolded);
    // console.log("Folded Text 2" + "\n" + compareFolded);
    // console.log("Tokenized Text 1" + "\n" + mainTokenized);
    // console.log("Tokenized Text 2" + "\n" + compareTokenized);
    // console.log("Filtered Text 1" + "\n" + mainFiltered);
    // console.log("Filtered Text 2" + "\n" + compareFiltered);
    // console.log("Stemmed Text 1" + "\n" + mainStemmed);
    // console.log("Stemmed Text 2" + "\n" + compareStemmed);

    // console.log("Text 1" + `\n` + mainFiltered);
    // console.log("Text 2" + `\n` + compareFiltered);
    // console.log("Synonyms matched: " + synonymMatch);
    // console.log("Negated Antonym matched: " + negatedMatch);
    // console.log("Exact Word matched: " + wordMatch);

    // console.log("Citation count: " + citation);

    // console.log("Text 1 Rolling Hashes" + '\n' + compareStemmed)
    // console.log("Text 2 Rolling Hashes" + '\n' + compareStemmed)
  }

  let percentPlagiarized = Math.round(
    ((matchWords + matchSynonyms + matchAntonyms) / totalFiltered) * 100
  );

  let percentPlagiarizedWithCitation = Math.round(
    (citationCount / (totalSentences - 1)) * 100
  );

  return (
    <>
      {/* Navbar */}
      <section className="w-full border-b">
        <nav className="flex p-6 max-w-6xl justify-between mx-auto items-center">
          <div className="font-dm-display text-2xl cursor-pointer">
            <img src="/rab-logo.png" alt="rab-log" className="h-12" />
          </div>
          <div className="cursor-pointer | hover:underline">About</div>
        </nav>
      </section>

      {/* Body */}
      <section className="w-full">
        <div className="p-6 flex flex-col max-w-6xl mx-auto justify-center items-center">
          <h1 className="text-4xl font-semibold mb-6">Plagiarsm Checker</h1>
          <p className="mb-6">Traditional Rabin-Karp Algorithm.</p>
          <form
            className="w-full flex-col flex justify-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-5 justify-center items-center mb-5 | md:flex-row">
              <textarea
                type="text"
                className="p-10 bg-white rounded-xl shadow-md w-full h-96 resize-none outline-none"
                placeholder="Enter the Original Text..."
                required
                value={main}
                onChange={(e) => {
                  setMain(e.target.value);
                }}
              />
              <textarea
                type="text"
                className="p-10 bg-white rounded-xl shadow-md w-full h-96 resize-none outline-none"
                placeholder="Enter the Text to Compare to..."
                required
                value={compare}
                onChange={(e) => {
                  setCompare(e.target.value);
                }}
              />
            </div>
            {loading ? (
              <LoadingButton />
            ) : (
              <button
                disabled={loading}
                className="text-white bg-[#252525] px-4 py-3 rounded-lg text-lg font-semibold"
              >
                Scan for Plagiarism
              </button>
            )}
          </form>
        </div>
      </section>

      {/* Results */}
      {resultFound && (
        <section className="w-full">
          <div className="px-6 mx-auto max-w-6xl">
            <div className="grid grid-cols-12 gap-6 bg-white shadow-lg rounded-xl p-6">
              <div className="col-span-12 text-center text-xl font-bold">
                Plagiarism Scan Report
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-4 w-[21rem] mx-auto text-center">
                  <div className="flex items-center">
                    <p
                      className={
                        similarities > 40
                          ? "w-20 text-center p-2 bg-red-500 rounded-xl border-red-700 border text-white"
                          : "w-20 text-center p-2 bg-emerald-500 rounded-xl border-emerald-700 text-white"
                      }
                    >
                      {Math.round(similarities)}%
                    </p>
                    <p className="ml-4">Similarity Score</p>

                    {/* <p className="ml-4">
                      {percentPlagiarizedWithCitation < 50
                        ? percentPlagiarized < 25
                          ? "Unique"
                          : "Plagiarized"
                        : "Well Cited"}
                    </p> */}
                  </div>

                  <div className="flex items-center">
                    <p className="w-20 text-center p-2 bg-[#252525] rounded-xl border-gray-700 text-white">
                      {matchWords}
                    </p>
                    <p className="ml-4">Exact Words Matched</p>
                  </div>

                  {/* <div className="flex items-center">
                    <p className="w-20 text-center p-2 bg-[#252525] rounded-xl border-gray-700 text-white">
                      {matchSynonyms}
                    </p>
                    <p className="ml-4">Synonyms Matched</p>
                  </div>

                  <div className="flex items-center">
                    <p className="w-20 text-center p-2 bg-[#252525] rounded-xl border-gray-700 text-white">
                      {matchAntonyms}
                    </p>
                    <p className="ml-4">Negated Antonyms Matched</p>
                  </div>

                  <div className="flex items-center">
                    <p className="w-20 text-center p-2 bg-[#252525] rounded-xl border-gray-700 text-white">
                      {similarities.length}
                    </p>
                    <p className="ml-4">Exact Positions Matched</p>
                  </div> */}

                  {/* <div className="flex items-center">
                    <p className="w-20 text-center p-2 bg-[#252525] rounded-xl border-gray-700 text-white">
                      {citationCount}
                    </p>
                    <p className="ml-4">Citations Found</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {/* <section className="w-full">
        <div className="p-6 mx-auto max-w-6xl grid grid-cols-12 gap-6">
          <div className="flex flex-col justify-center items-center col-span-12 | md:col-span-4">
            <i className="fa-solid fa-magnifying-glass fa-5x"></i>
            <p className="text-center mt-4 w-80 | md:w-full">
              Can detect plagiarism out of synonymous words, negated antonyms,
              and modified words.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center col-span-12 | md:col-span-4">
            <i className="fa-solid fa-pen-nib fa-5x"></i>
            <p className="text-center mt-4 w-80 | md:w-full">
              Can read in-text citations in all styles including APA, MLA,
              Chicago, and Harvard and credit work as not plagiarism.
            </p>
          </div>

          <div className="flex flex-col justify-center items-center col-span-12 | md:col-span-4">
            <i className="fa-solid fa-arrows-rotate fa-5x"></i>
            <p className="text-center mt-4 w-80 | md:w-full">
              Catch paraphrases that changes the sentence structure but with
              retained meaning.
            </p>
          </div>
        </div>
      </section> */}
    </>
  );
}
