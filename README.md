# The LoveBank Test Bounty Program 
***
Thank you everyone for your participation!! Please stay tuned for rewards!

LoveBank recognizes the importance of security researchers in keeping our community safe and fun. With the launch of LoveBank around the corner, we would love the community to help provide disclosure of security vulnerabilities via our bounty program described below.

## What you Should Know About LoveBank:

LoveBank is a decentralized application built on the Ethereum network. It is the first DApp focused on the human relationship in reality. 

Just like the real bank, we offered the love bank wallet where you and your partner could deposit and withdraw crypto currency at anytime you like. 

- **Co-Management.** You open your love bank wallet by signing the love contract, and one rule in the love contract is that you and your partner organize it together. The transaction would fail if it is initiated by unilateral or without mutual authorization. 

- **Breakup Compensation.** If one betrayed the commitment and ended up this relationship unilateral, the crypto currency in the love bank account would transfer to the other’s account automatically. This is another rule in love contract. Accident happens in relationship and we keep your money.

- **Gifts.** When love is in the air, everyone could sense it! You can share the quantifiable evidence of your love bank wallet and your sweet accompanying photo you posted on love bank to your friends on Facebook or Twitter! And they could cheer you up by transferring a bit lucky crypto currency to your love bank wallet.

## The Scope for this Bounty Program:

This bounty program will run from **12:01am GMT January 6th - 11:59pm GMT January 10th, 2018.** All code important to this bounty program is publicly available within this repo Help us identify bugs, vulnerabilities, and exploits in the smart contract such as:

-	Incorrect usage of the game

-	Transaction failure

-	Act as one of the admin accounts

-	Etherup failure

-	Any sort of malfunction

## Rules & Rewards:

-	Issues that have already been submitted by another user or are already known to the LoveBank team are not eligible for bounty rewards.

-	Bugs and vulnerabilities should only be found using accounts you own and create. Please respect third party applications and understand that an exploit that is not specific to the LoveBank smart contract is not part of the bounty program. Attacks on the network that result in bad behavior are not allowed.

-	The LoveBank website is not part of the bounty program, only the smart contract code included in this repo.

-	The LoveBank bounty program considers a number of variables in determining rewards. Determinations of eligibility, score and all terms related to a reward are at the sole and final discretion of LoveBank team.

-	Reports will only be accepted via GitHub issues submitted to this repo.

-	In general, please investigate and report bugs in a way that makes a reasonable, good faith effort not to be disruptive or harmful to us or others.

The value of rewards paid out will vary depending on Severity which is calculated based on Impact and Likelihood as followed by [OWASP](https://www.owasp.org/index.php/OWASP_Risk_Rating_Methodology):

**Note: Rewards are at the sole discretion of the LB Team. 1 point currently corresponds to 0.1 USD (paid in ETH). All the people on our leaderboard of accepted bugs will receive a limited avatar WhiteHat available only to successful participants in this bounty program.

![Github](https://github.com/lovebankcrypto/lovebanktest/blob/master/owasp_w600.png)

- Critical: up to 1000 points

- High: up to 500 points

- Medium: up to 250 points

- Low: up to 125 points

- Note: up to 50 points

## Examples of Impact:

- High: Steal/redirect ETH to another address, create a love account without MetaMask wallet address or without deposition.

- Medium: Withdraw or deposit failure. Finish the transaction without the partner’s approve. Ether up failure. 

-	Low: The rank of top couples.

## Suggestions for Getting the Highest Score:

-	Description: Be clear in describing the vulnerability or bug. Ex. share code scripts, screenshots or detailed descriptions.

-	Fix it: if you can suggest how we fix this issue in an appropriate manner, higher points will be rewarded.


## LoveBank appreciates you taking the time to participate in our program, which is why we’ve created rules for us too:

-	We will respond as quickly as we can to your submission (within 3 days).

-	Let you know if your submission will qualify for a bounty (or not) within 7 business days.

-	We will keep you updated as we work to fix the bug you submitted.

-	LoveBank’s core development team, employees and all other people paid by the LoveBank project, are not eligible for rewards.


## How to Create a Good Vulnerability Submission:

-	Description: A brief description of the vulnerability

-	Scenario: A description of the requirements for the vulnerability to happen

-	Impact: The result of the vulnerability and what or who can be affected

-	Reproduction: Provide the exact steps on how to reproduce this vulnerability on a new contract, and if possible, point to specific tx hashes or accounts used.

-	Note: If we can't reproduce with given instructions then a (Truffle) test case will be required.

-	Fix: If applies, what would you do to fix this


## FAQ:
- How are the bounties paid out?

  - Rewards are paid out in ETH after the submission has been validated, usually a few days later. Please provide your ETH address.

- I reported an issue but have not received a response!

  - We aim to respond to submissions as fast as possible. Feel free to email us if you have not received a response.

-	Can I use this code elsewhere?

  -	No. Please do not copy this code for other purposes than reviewing it.

- I have more questions!

  - Create a new issue with the title starting as “QUESTION”

- Will the code change during the bounty?

  - Yes, as issues are reported we will update the code as soon as possible. Please make sure your bugs are reported against the latest versions of the published code.


## Important Legal Information:

The bug bounty program is an experimental rewards program for our community to encourage and reward those who are helping us to improve LoveBank. You should know that we can close the program at any time, and rewards are at the sole discretion of the LoveBank team. All rewards are subject to applicable law and thus applicable taxes. Don't target our physical security measures, or attempt to use social engineering, spam, distributed denial of service (DDOS) attacks, etc. Lastly, your testing must not violate any law or compromise any data that is not yours.

