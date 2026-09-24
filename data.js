/* Word list adapted from the Washington State DES Colors Preferred
   Communication Style Assessment. Color writeups and message examples
   are original. Preferences, not a diagnosis. */
window.COLOR_DATA = {
  profileKey: "color-communication-profile",
  draftKey: "color-communication-draft",
  order: ["blue", "green", "yellow", "red"],
  colors: {
    blue: {
      name: "Blue",
      value: "Accuracy, structure, and a reason for the choice.",
      lead: "Context, criteria, and time to review.",
      avoid: "Vague plans, missing numbers, and pressure to agree in the room.",
      misread: "Cold, slow, or stuck on details.",
      edge: "Name the decision the evidence already supports, and separate that from what you still want to check.",
      portrait: "You look for the logic under a plan. A message lands when it shows its work: assumptions, criteria, and what good looks like.",
      help: "Send the facts ahead. Say what you want reviewed, and give a time to come back with questions.",
      phrases: [
        "Here are the options and the criteria.",
        "What risks are we missing?",
        "Please review this and send questions by Friday."
      ],
      needFirst: "the data",
      nextKind: "a review"
    },
    green: {
      name: "Green",
      value: "Harmony, fairness, and the effect on people.",
      lead: "Care, time, and a real chance to say what is hard.",
      avoid: "Rushing, public pressure, and bluntness with no relationship under it.",
      misread: "Indecisive, passive, or unwilling to take a stand.",
      edge: "Say what you need in order to align, in one or two plain sentences.",
      portrait: "You listen for how a change will feel to the people who have to live with it. Trust comes before speed.",
      help: "Ask how it is landing. Explain the human reason. Do not demand an answer in front of the group.",
      phrases: [
        "I want to make sure this works for the people involved.",
        "What would make this workable for you?",
        "Here is what I am hearing. Did I get that right?"
      ],
      needFirst: "reassurance",
      nextKind: "a check-in"
    },
    yellow: {
      name: "Yellow",
      value: "Energy, ideas, and a part in what happens next.",
      lead: "Purpose, invitation, and a short path to momentum.",
      avoid: "A cold transaction, a monologue, or shutting an idea down before it is heard.",
      misread: "Scattered, hard to pin down, or more enthusiastic than prepared.",
      edge: "Bring two or three ideas, say why one of them should win, and name the next step.",
      portrait: "You start with possibility. People and momentum matter as much as the plan, and a conversation that has no air in it goes flat.",
      help: "Open with why it matters, leave room for an idea, and appreciate a useful contribution out loud.",
      phrases: [
        "Let’s build on that.",
        "What is the best version of this?",
        "Who else should be in this?"
      ],
      needFirst: "a sense of possibility",
      nextKind: "a short brainstorm"
    },
    red: {
      name: "Red",
      value: "Speed, a clear ask, and a decision.",
      lead: "The point, the tradeoff, and the next action.",
      avoid: "A long setup, a vague “thoughts?”, and detail they did not ask for.",
      misread: "Pushy, impatient, or uninterested in people and risk.",
      edge: "Ask who is affected, and what would make you slow down, before you close.",
      portrait: "You lead with the outcome. Clarity and forward motion feel like respect. A meeting that never lands on an owner feels like a waste.",
      help: "Start with the recommendation. Offer two options and a deadline. Stop when the decision is made.",
      phrases: [
        "Here is what I recommend.",
        "Two options. Here is the tradeoff.",
        "What decision do you want to make today?"
      ],
      needFirst: "the headline",
      nextKind: "a decision"
    }
  },
  rows: [
    [
      ["Accurate", "Precise, correct, careful"],
      ["Patient", "Tolerant, willing to wait"],
      ["Gregarious", "Sociable, outgoing"],
      ["Direct", "Candid, straightforward"]
    ],
    [
      ["Systematic", "Methodical, organized"],
      ["Loyal", "Trustworthy, dedicated"],
      ["Persuasive", "Convincing, seeks to influence"],
      ["Daring", "Willing to try the unproven"]
    ],
    [
      ["Aloof", "Stands back, slow to initiate"],
      ["Passive", "Uninvolved, hard to draw in"],
      ["Impulsive", "Moves on enthusiasm"],
      ["Stubborn", "Holds a position, hard to move"]
    ],
    [
      ["Mature", "Seasoned, ready"],
      ["Stable", "Reliable, consistent"],
      ["Confident", "Self-assured, secure"],
      ["Self-reliant", "Comfortable depending on yourself"]
    ],
    [
      ["Conventional", "Typical, traditional"],
      ["Serene", "Peaceful, calm"],
      ["Self-promoting", "Puts your own case forward"],
      ["Forceful", "Strong, hard to ignore"]
    ],
    [
      ["Restrained", "Controlled, held back"],
      ["Even-tempered", "Calm, level-headed"],
      ["Charming", "Appealing, engaging"],
      ["Quick", "Brief, brisk"]
    ],
    [
      ["Practical", "Sensible, solid"],
      ["Predictable", "Does the expected"],
      ["Emotional", "Sensitive, demonstrative"],
      ["Bold", "Courageous, fearless"]
    ],
    [
      ["Competent", "Capable, skilled"],
      ["Intelligent", "Smart, knowledgeable"],
      ["Colorful", "Lively, spirited"],
      ["Creative", "Inventive, stimulating"]
    ],
    [
      ["Devout", "Sincere, genuine"],
      ["Evaluative", "Assesses and judges"],
      ["Passionate", "Intense, enthusiastic"],
      ["Risk taker", "Adventurous, not cautious"]
    ],
    [
      ["Humble", "Modest, respectful"],
      ["Gentle", "Kind, pleasant"],
      ["Optimistic", "Hopeful, trusting"],
      ["Self-directed", "Works without much supervision"]
    ],
    [
      ["Perfectionist", "Demands precision"],
      ["Easy mark", "Easily swayed, gives in"],
      ["Talkative", "Outgoing, communicative"],
      ["Impatient", "Easily irritated by delay"]
    ],
    [
      ["Law-abiding", "Conscientious, honorable"],
      ["Good listener", "Attentive, patient"],
      ["High-spirited", "Lively, eager"],
      ["Outspoken", "Blunt, unrestrained"]
    ],
    [
      ["Respectful", "Polite, considerate"],
      ["Content", "Satisfied, at ease"],
      ["Playful", "Fun, good-natured"],
      ["Experimental", "Pioneering, tries things"]
    ],
    [
      ["Obliging", "Agreeable, accommodating"],
      ["Neighborly", "Friendly, sociable"],
      ["Popular", "Generally liked"],
      ["Restless", "Uneasy when standing still"]
    ],
    [
      ["Cautious", "Careful, wary"],
      ["Moderate", "Balanced, even"],
      ["Good mixer", "At ease with new people"],
      ["Competitive", "Ambitious, determined"]
    ]
  ],
  bands: [
    { label: "> 51", min: 52, max: 60 },
    { label: "46–50", min: 46, max: 50 },
    { label: "41–45", min: 41, max: 45 },
    { label: "36–40", min: 36, max: 40 },
    { label: "31–35", min: 31, max: 35 },
    { label: "26–30", min: 26, max: 30 },
    { label: "< 25", min: 15, max: 24 }
  ],
  hook: {
    line: "Just tell me what you need.",
    hearings: [
      { color: "red", text: "Good. Skip the warmup and say the ask." },
      { color: "yellow", text: "There is no room to play with the idea. Just comply." },
      { color: "green", text: "How this lands on people is beside the point." },
      { color: "blue", text: "Do not bring nuance or risk. Bring the task." }
    ]
  },
  situations: [
    {
      id: "decision",
      label: "Ask for a decision",
      facts: "You recommend Vendor B: fastest to implement, lowest ongoing cost. Vendor A is slower and safer on rollout. You need a decision Thursday at 3pm. If they approve B, you will book Friday’s kickoff.",
      versions: {
        red: {
          open: "The recommendation and the deadline.",
          skip: "The story of how you got to the shortlist.",
          next: "A yes or no by Thursday 3pm.",
          body: "Decision needed by Thursday 3pm: Vendor B.\n\nB is the fastest to implement and the cheapest to run. A is slower and safer on rollout.\n\nI recommend B. If you approve it, I will book Friday’s kickoff."
        },
        yellow: {
          open: "The opportunity, then an invitation.",
          skip: "A closed memo with no place for them to add anything.",
          next: "A short reaction before Thursday, then a kickoff.",
          body: "We get to pick how this starts, and I would love your read.\n\nVendor B gets us live fastest and costs less to keep running. Vendor A is the safer, slower rollout.\n\nI am leaning B. What are we not seeing? If we are in, I will set a Friday kickoff and we can shape the first week there."
        },
        green: {
          open: "The effect on the people who will live with the choice.",
          skip: "A public push for an answer right now.",
          next: "A check-in on concerns before Thursday.",
          body: "I want this choice to work for the people who have to live with it.\n\nVendor B is fastest and cheapest to run. Vendor A is slower and gentler on rollout. I am leaning B, and I do not want to miss an impact.\n\nWhat concerns should I fold in before we decide on Thursday? If B holds, I will book Friday’s kickoff."
        },
        blue: {
          open: "The goal, the criteria, and the assumption.",
          skip: "“We’ll figure it out” with no standard for the choice.",
          next: "Questions by Thursday noon, decision at 3pm.",
          body: "Goal: choose a vendor by Thursday 3pm.\n\nRecommendation: Vendor B. Shortest implementation, lowest ongoing cost.\nAlternative: Vendor A. Slower, lower rollout risk.\nAssumptions: current volume, no custom integration in phase 1.\n\nPlease send questions by Thursday noon. If B is approved, Friday’s kickoff goes on the calendar."
        }
      }
    },
    {
      id: "feedback",
      label: "Give feedback",
      facts: "The status report was due Wednesday and arrived Friday. The team filled the gaps by guessing. You need the next one on time, or a note by the day before if the date will slip.",
      versions: {
        red: {
          open: "What happened, the cost, and what you need instead.",
          skip: "A cushion of praise that hides the ask.",
          next: "A commitment for the next report.",
          body: "The Wednesday report arrived Friday. The team guessed to fill the gaps, and that cost a day.\n\nNext time I need it on Wednesday, or a note the day before if it will slip.\n\nCan you commit to that for the next one?"
        },
        yellow: {
          open: "The shared aim, then the specific miss, with room to fix it together.",
          skip: "A flat correction with no path back into the work.",
          next: "One idea from them for how the next one stays on time.",
          body: "The report is what lets everyone else move, and I want that to feel easy rather than last-minute.\n\nThis one was due Wednesday and came Friday, so people filled numbers they were not sure about.\n\nHow do we make the next one land on time? On time, or a heads-up the day before, both work. I am in either way."
        },
        green: {
          open: "A private, fair account of the impact on people.",
          skip: "Calling it out in the group, or a verdict with no curiosity.",
          next: "What got in the way, and what would make the next one workable.",
          body: "I want to raise this in a way that is fair.\n\nThe report was due Wednesday and came Friday. People filled in numbers they were not sure about, and that was stressful for them.\n\nWhat got in the way? I need either the report on time or a note the day before so we can adjust. What would make that workable?"
        },
        blue: {
          open: "The date, the gap, and the standard for done.",
          skip: "A general feeling that it was “late” with no example.",
          next: "Agreement on the rule for the next due date.",
          body: "Standard: the status report is due Wednesday, with the figures the team uses on Thursday.\n\nThis cycle it arrived Friday. Thursday’s discussion used guessed numbers.\n\nFor the next cycle, done means Wednesday, or a written note the day before that names the new time. Tell me which of those you can meet."
        }
      }
    },
    {
      id: "change",
      label: "Announce a change",
      facts: "The weekly planning meeting moves from Monday 9am to Tuesday 9am, starting next week. Monday is overloaded with incident review. Same agenda, same length. Anyone who cannot make Tuesday tells you by Friday.",
      versions: {
        red: {
          open: "The new time and what you need from them.",
          skip: "A long rationale before the new fact.",
          next: "Conflicts sent by Friday.",
          body: "Planning moves to Tuesday 9am starting next week. Same agenda, same length.\n\nMonday is already full with incident review.\n\nIf you cannot make Tuesday, tell me by Friday."
        },
        yellow: {
          open: "Why the move helps, and a little room to shape it.",
          skip: "A bare calendar change with no purpose.",
          next: "Conflicts by Friday, ideas for the agenda welcome.",
          body: "We are moving planning to Tuesday 9am so Monday can actually breathe. Incident review has been eating the room.\n\nSame agenda, same length, starting next week. I think this gives the plan a better shot at being useful.\n\nIf Tuesday does not work, tell me by Friday. If you have one change that would make the hour better, send that too."
        },
        green: {
          open: "Acknowledgement that a standing meeting is a habit, plus support.",
          skip: "“This is happening, keep up.”",
          next: "A private note by Friday if Tuesday causes a problem.",
          body: "I know Monday 9am is a habit, and moving it will annoy someone’s calendar.\n\nStarting next week, planning is Tuesday 9am. Monday is overloaded with incident review, and I do not want planning to be the meeting that gets squeezed. Same agenda, same length.\n\nIf Tuesday is a real problem, tell me by Friday and we will find a way to include you."
        },
        blue: {
          open: "What is changing, why, and what stays the same.",
          skip: "A casual “we’re shifting it” with no date.",
          next: "Exceptions registered by Friday.",
          body: "Change: weekly planning moves from Monday 9am to Tuesday 9am, effective next week.\n\nReason: Monday is committed to incident review, so planning was losing the room.\nUnchanged: agenda and length.\n\nIf you have a hard conflict with Tuesday, send it by Friday so we can record an exception."
        }
      }
    },
    {
      id: "meeting",
      label: "Open a meeting",
      facts: "The group has twenty minutes and must leave with a direction on the rollout. Two options are on the table.",
      versions: {
        red: {
          open: "The decision and the two options.",
          skip: "A round of updates before the point.",
          next: "One direction, one owner, before time is up.",
          body: "We have twenty minutes and we need a direction before we leave.\n\nTwo options are on the table. I will state the tradeoff for each. Then we pick one and name an owner."
        },
        yellow: {
          open: "The aim, a short burst of ideas, then a choice.",
          skip: "Either a free-for-all or a closed script.",
          next: "Five minutes of ideas, then a direction.",
          body: "We are here to pick a rollout direction people can get behind.\n\nTwo options are up. Take five minutes and tell me what we are not seeing, then we choose one before the twenty minutes are gone."
        },
        green: {
          open: "A check that concerns are in the room before the choice.",
          skip: "A vote that starts before anyone quiet has spoken.",
          next: "Concerns heard, then a direction.",
          body: "Before we pick a rollout direction, I want the concerns actually said.\n\nWe have two options and twenty minutes. I will ask anyone who has not spoken what would make this hard. Then we choose a path that the group can stand."
        },
        blue: {
          open: "The criteria, then the options.",
          skip: "Choosing on energy with no standard.",
          next: "A direction that names why it won.",
          body: "We have twenty minutes to choose a rollout direction.\n\nThe test is: fewer handoffs, a date we can keep, and a named owner. Two options are on the table. We will score them against that test and leave with the one that wins, plus what we still do not know."
        }
      }
    },
    {
      id: "one-on-one",
      label: "Start a 1:1",
      facts: "A regular thirty-minute 1:1. You want to know what is stuck, what decision they need from you, and how they are actually doing.",
      versions: {
        red: {
          open: "The outcome of the half hour.",
          skip: "A wandering check-in with no ask.",
          next: "Blockers and the decision they need from you.",
          body: "Thirty minutes. I want three things: what is stuck, what decision you need from me, and the one outcome you are driving this week.\n\nStart wherever the time is going."
        },
        yellow: {
          open: "Energy first, then the work.",
          skip: "A status readout with no room for an idea.",
          next: "One stuck point and one place they want a partner.",
          body: "I want this half hour to be useful and not grim.\n\nWhat is the most interesting problem on your plate, and where do you want a partner? If something is stuck or you need a decision from me, put that on the table too."
        },
        green: {
          open: "How the week feels, before the list.",
          skip: "Jumping straight to tasks.",
          next: "What support would actually help.",
          body: "Before the list: how is the week actually feeling?\n\nI would like to know what is stuck and whether you need a decision from me. Mostly I want this to be a place you can say what is hard. What would be useful support right now?"
        },
        blue: {
          open: "A small agenda, sent in advance when you can.",
          skip: "An unstructured chat you later remember differently.",
          next: "Owners and dates for anything you open.",
          body: "Agenda for the thirty minutes: how the work is tracking, what is stuck, and any decision you need from me.\n\nIf you want me to read something first, send it ahead. We will leave with owners and dates for whatever we open."
        }
      }
    }
  ],
  spot: [
    {
      prompt: "What pace do they keep?",
      options: [
        ["red", "Fast and decisive"],
        ["yellow", "Animated, quick, full of asides"],
        ["green", "Steady and patient"],
        ["blue", "Measured and thoughtful"]
      ]
    },
    {
      prompt: "What do they focus on?",
      options: [
        ["red", "Results and speed"],
        ["yellow", "People, ideas, and momentum"],
        ["green", "Relationships and whether everyone is included"],
        ["blue", "Accuracy, logic, and what could go wrong"]
      ]
    },
    {
      prompt: "What do they ask for?",
      options: [
        ["red", "The goal, and what happens next"],
        ["yellow", "What we could do, and who is involved"],
        ["green", "How this affects the team, and whether we are aligned"],
        ["blue", "The data, the plan, and the criteria"]
      ]
    },
    {
      prompt: "What do they reward?",
      options: [
        ["red", "Brevity and a decision"],
        ["yellow", "Energy and a new idea"],
        ["green", "Listening and fairness"],
        ["blue", "Precision and a reason"]
      ]
    }
  ],
  pairs: [
    {
      title: "Red and Green",
      tension: "Red pushes for speed. Green needs inclusion and care before a choice feels fair.",
      flex: [
        ["red", "Slow down and ask who is affected before you close."],
        ["green", "Say what you need in order to align, in a sentence or two."]
      ]
    },
    {
      title: "Yellow and Blue",
      tension: "Yellow wants to invent out loud. Blue wants structure and a reason to believe it.",
      flex: [
        ["yellow", "Bring two or three ideas already ordered, with a reason for the first one."],
        ["blue", "Allow a short window to invent before you narrow."]
      ]
    },
    {
      title: "Red and Blue",
      tension: "Red wants movement. Blue wants enough certainty that the move is not a guess.",
      flex: [
        ["red", "Agree on the minimum evidence that would let you decide, and a deadline for that decision."],
        ["blue", "Name the decision you can already support, and park the rest as follow-up."]
      ]
    }
  ],
  flexQuestions: [
    "What do they value right now: speed, energy, harmony, or accuracy?",
    "What do they need first: the headline, a sense of possibility, reassurance, or the data?",
    "What is the next step: a decision, a brainstorm, a check-in, or a review?"
  ],
  mixed: "With a mixed group, open with the headline, say why it matters, name who it affects, then give the few facts and the next step. Follow up in writing so the people who think slowly still have the detail.",
  sources: [
    {
      href: "https://des.wa.gov/sites/default/files/2022-06/ColorsPreferredCommunicationStyleAssessment.pdf",
      label: "Washington DES Colors Preferred Communication Style Assessment (PDF)"
    },
    {
      href: "https://discoveryourself.com/communicating-four-color-personalities/",
      label: "Discover Yourself: communicating with four color personalities"
    },
    {
      href: "https://youtu.be/ikbcrpowlIs",
      label: "Vinh Giang: How to Talk to Anyone (Once You Know Their Color)"
    }
  ]
};
