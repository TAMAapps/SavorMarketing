---
title: "Inside Savor's 10 Point Food Scoring System"
description: "A transparent look at the criteria, maths and tasting discipline behind Savor's dish ratings so you can trust every number you see."
pubDate: "2025-07-11"
slug: "/how-our-10-point-scale-works"
tags: ["methodology","transparency","food ratings"]
---

## Introduction
Ask ten diners to rate a bowl of tonkotsu ramen and you will get ten different answers.  Some chase collagen rich broth, others obsess over noodle texture.  A few judge only the chashu.  When Savor set out to build dish level ratings we knew the system had to absorb those nuances yet still roll up into a single, easily understood score.  Over two years, hundreds of tasting sessions and plenty of late night spreadsheet debates, the **Savor 10 Point Scale** emerged.  This piece explains how it works, why we chose each criterion and what safeguards keep the numbers honest.

> Reader promise: by the end you will know exactly what a 7.4 means, why a 9 is rare and how the score adjusts as new reviews land.

## 1  Why Not Stick With Five Stars?
A five star system sounds simple, but in practice it collapses quickly.  Most users avoid ratings below three, which bunches everything at the top.  The gap between a very good dish and a life changing one becomes a rounding error.  Chefs lose the incentive to chase marginal gains because the scoreboard cannot show them.  We needed more headroom, so we doubled the resolution.

## 2  The Ten Criteria
We did not pull numbers from thin air.  Each point maps to a specific sensory or value question.  During testing we asked trained tasters to score dishes across dozens of dimensions, then ran regression analysis to learn which ones drove overall delight.  The winners became our rubric.

| Point | Criterion | Weight | Field Note Example |
|------:|-----------|-------:|--------------------|
| 1 | First bite impact | 15 % | The immediate pop of lime leaf in a Bangkok fried chicken
| 2 | Ingredient quality | 12 % | Bright yolk in a Tokyo tamago kake gohan
| 3 | Technique execution | 12 % | Perfect medium rare centre in a Lisbon sardine fillet
| 4 | Authenticity | 10 % | Bun bo Hue that respects proper lemongrass heat
| 5 | Creativity | 8 % | Kimchi brine in a Nashville hot wing
| 6 | Presentation | 8 % | Clean line of sauce that signals balance, not showboating
| 7 | Portion value | 8 % | Twelve plump dumplings for the price of eight in Shanghai
| 8 | Consistency | 8 % | Third visit, same char on the yakitori
| 9 | Aroma and finish | 7 % | Juniper smoke that lingers after a Copenhagen venison course
| 10 | Crave again factor | 12 % | The itch to reorder tacos al pastor before leaving the stand

The table shows default weights used by the algorithm.  We revisit them every quarter, looking at user feedback and statistical spread.  Tweaks rarely exceed one or two percentage points; stability matters more than chasing fashion.

### How a Review Becomes a Score
1. User snaps a photo.  Computer vision guesses the dish so less typing is needed.  
2. Slider input captures the reviewer's overall number.  Advanced tasters can open the criteria panel and log subscores.  
3. Natural language processing skims the note field for sentiment clues.  If someone raves about crunch the model nudges the skin integrity subscore upward.  
4. The app saves raw inputs, not just the final average.  That lets us rerun calculations if the weights change.

## 3  Preventing Score Drift
Early data can mislead.  A single glowing review might push a dish over nine even if later feedback proves middling.  We temper that using Bayesian adjustment.  In plain English: every new dish starts with a neutral prior, then shifts toward its true score as reviews pile up.  The maths live in a public GitHub repo for anyone to audit.

### Reviewer Reliability
Not every palate is equal.  Frequent reviewers with a proven track record earn a **Gold Fork** badge.  Their scores carry a little more influence, just enough to steady the curve, never enough to dominate it.

### Duplicate and Fraud Checks
We use device fingerprinting and photo hash comparison to catch repeated submissions.  If two entries share the same image we flag them for moderation.  Suspicious clusters of tenth scores from the same IP range trigger a cooldown.

## 4  Reading the Numbers in Practice
• **Below 5** – The kitchen missed a fundamental, maybe under seasoning or soggy crust.  Proceed only if you are curious about what went wrong.

• **6 to 7** – Solid everyday eating.  Good for a quick lunch but not worth a detour.

• **7 to 8.5** – Memorable.  The dish nails its brief and shows care in sourcing.

• **Above 8.5** – Plan a trip.  These are the plates people text friends about before the bill even lands.  Less than three percent of dishes reach this tier.

## 5  How Chefs Use the Data
Several restaurants now watch their Savor dashboard to spot weak links.  One Tokyo ramen shop saw broth scores lagging noodle scores by nearly one point, retrained staff on pork bone extraction time and lifted the average within two weeks.  Transparent numbers create a feedback loop that Instagram likes never will.

## 6  Frequently Asked Questions
**Does the scale punish inexpensive street food?**  Price lives inside portion value.  A one dollar taco that tastes like a seven dollar taco scores well.

**Can a dish lose points over time?**  Yes.  Consistency is its own criterion, and Bayesian averaging keeps the rolling score honest.

**Why no half points?**  The slider allows decimals.  We store them internally, then round to one decimal place for display.

## Conclusion
Numbers alone never capture the full pleasure of eating, but they steer us toward better bites.  The Savor 10 Point Scale mixes data science with real world tasting discipline so that when you see an 8.3 next to a plate of Thai fried chicken you know it earned every fraction.  Open the app, rate your next meal and help make the numbers even smarter.