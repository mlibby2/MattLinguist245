---
title: "Carreias Data Analysis"
author: "mlibby2"
date: "May 26, 2017"
output: html_document
---

# Load necessary libraries and data
setwd("/Users/mactor95/MattLinguist245/results/")
setwd("/Users/titlis/Downloads/")
source("helpers.R")
library(ggplot2)
library(languageR)
library(tidyverse)
library(lme4)
d = read.csv("carreiras-data2.csv")

# Split up response vectors into separate items
d$rtd = sapply(strsplit(as.character(d$response),", "), "[", 1)
d$rt1 = sapply(strsplit(as.character(d$response),", "), "[", 2)
d$rt2 = sapply(strsplit(as.character(d$response),", "), "[", 3)
d$rt3 = sapply(strsplit(as.character(d$response),", "), "[", 4)
d$resp = sapply(strsplit(as.character(d$response),", "), "[", 5)
d$rtd = gsub("\\[", "", d$rtd)
d$resp = gsub("]", "", d$resp)
d$resp = gsub("u", "", d$resp)
d$resp = gsub("'", "", d$resp)

theme_set(theme_bw())

# Bar plot of correct/incorrect answers by subject
d$CorrectGiven = ifelse(d$correctResponse == d$resp, "correct", "incorrect")
table(d$CorrectGiven)

ggplot(d, aes(x=d$CorrectGiven)) +
  geom_histogram(stat="count") +
  xlab("Correctness of Response") +
  ylab("Number of cases") +
  facet_wrap(~workerid)

# Bar plot of correct/incorrect answers total
ggplot(d, aes(x=d$CorrectGiven,y=1)) +
  geom_bar(stat="identity",fill="gray80",color="red", width=0.5) +
  xlab("Correctness of Response") +
  ylab("Number of cases")

# Create a condition of whether the pronoun matches the profession stereotype or not, or is neutral
d$pronoun <- factor(d$pronoun, levels=c("He", "She", "neutral"))
d$Match = ifelse(d$expectedPronoun == d$pronoun, "match", ifelse(d$expectedPronoun == "neutral", "neutral", "mismatch"))

# Initial visualizations of target reading time
rt2_means = d %>%
  mutate(numrt2 = as.numeric(rt2)) %>%
  group_by(Match, pronoun) %>%
  summarize(Mean = mean(numrt2), CIlow = ci.low(numrt2), CIhigh = ci.high(numrt2), max = max(numrt2)) %>%
  mutate(ymin = Mean-CIlow, ymax = Mean+CIhigh)
rt2_means

ggplot(rt2_means, aes(x=Match,y=Mean,color=pronoun,group=pronoun)) +
  geom_point(size=2) + 
  geom_line() +
  ggtitle("Mean Response Times for Second Sentence") +
  theme(plot.title = element_text(hjust = 0.5)) +
  xlab("Gender match") +
  ylab("Empirical response times") +
  geom_errorbar(aes(ymin=ymin, ymax=ymax), width=.25)

rt2_means = d %>%
  mutate(numrt2 = as.numeric(rt2)) %>%
  group_by(Match,profession,pronoun) %>%
  summarize(Mean = mean(numrt2), CIlow = ci.low(numrt2), CIhigh = ci.high(numrt2), max = max(numrt2)) %>%
  mutate(ymin = Mean-CIlow, ymax = Mean+CIhigh)
rt2_means

ggplot(rt2_means, aes(x=Match,y=Mean,color=pronoun)) +
  geom_point(size=2) + 
  ggtitle("Mean Response Times for Second Sentence by Profession") +
  theme(plot.title = element_text(hjust = 0.5)) +
  xlab("Gender match") +
  ylab("Empirical response times") +
  geom_errorbar(aes(ymin=ymin, ymax=ymax), width=.25) +
  facet_wrap(~profession)

# Mean reading times for each condition
MatchCon = d %>%
  filter(Match == "match")
MatchCon$numrt2 = as.numeric(MatchCon$rt2)
mean(MatchCon$numrt2)

MatchConMale = MatchCon %>%
  filter(pronoun == "He")
MatchConMale$numrt2 = as.numeric(MatchConMale$rt2)
mean(MatchConMale$numrt2)

MatchConFemale = MatchCon %>%
  filter(pronoun == "She")
MatchConFemale$numrt2 = as.numeric(MatchConFemale$rt2)
mean(MatchConFemale$numrt2)

MismatchCon = d %>%
  filter(Match == "mismatch")
MismatchCon$numrt2 = as.numeric(MismatchCon$rt2)
mean(MismatchCon$numrt2)

MismatchConMale = MismatchCon %>%
  filter(pronoun == "He")
MismatchConMale$numrt2 = as.numeric(MismatchConMale$rt2)
mean(MismatchConMale$numrt2)

MismatchConFemale = MismatchCon %>%
  filter(pronoun == "She")
MismatchConFemale$numrt2 = as.numeric(MismatchConFemale$rt2)
mean(MismatchConFemale$numrt2)

NeutralCon = d %>%
  filter(Match == "neutral")
NeutralCon$numrt2 = as.numeric(NeutralCon$rt2)
mean(NeutralCon$numrt2)

NeutralConMale = NeutralCon %>%
  filter(pronoun == "He")
NeutralConMale$numrt2 = as.numeric(NeutralConMale$rt2)
mean(NeutralConMale$numrt2)

NeutralConFemale = NeutralCon %>%
  filter(pronoun == "She")
NeutralConFemale$numrt2 = as.numeric(NeutralConFemale$rt2)
mean(NeutralConFemale$numrt2)

# Split statement vectors into first and second sentence 
d$FirstSentence = sapply(strsplit(as.character(d$statements),", "), "[", 1)
d$SecondSentence = sapply(strsplit(as.character(d$statements),", "), "[", 2)
d$SecondSentence = gsub("]", "", d$SecondSentence)
d$SecondSentence = gsub("u", "", d$SecondSentence)
d$SecondSentence = gsub("'", "", d$SecondSentence)
d$SecondSentence

# Find word length of each sentence
d$UniqueRow = row.names(d)
dsent = d %>%
  group_by(UniqueRow) %>%
  summarize(SentenceLength = length(strsplit(as.character(SecondSentence), " ")[[1]]))
d = as.data.frame(d)
dsent = as.data.frame(dsent)
d$SentenceLength = 0
d[as.character(dsent$UniqueRow),]$SentenceLength = dsent$SentenceLength

# Reading time as an effect of match, subject and profession random variables
d$Match = as.factor(as.character(d$Match))
d$logrt2 = log(d$numrt2)
m = lmer(logrt2 ~ Match + (1 | workerid) + (1 | profession), data = d)
summary(m)

# Reading time as an effect of match x expected pronoun, subject and profession random variables
MatchMismatch = d %>%
  filter(Match != "neutral")
centered = cbind(MatchMismatch,myCenter(MatchMismatch[,c("Match","expectedPronoun")]))
m = lmer(logrt2 ~ cMatch*cexpectedPronoun +  (1 | workerid) + (1 | profession), data = centered)
summary(m)

# Reading time as an effect of match x expected pronoun and sentence length, subject and profession random variables
centered$sentenceLength = MatchMismatch$sentenceLength
m = lmer(logrt2 ~ cMatch*cexpectedPronoun*SentenceLength +  (1 | workerid) + (1 | profession), data = centered)
summary(m)

# Neutral case - response time as an effect of the pronoun provided, subject random variable
m = lmer(logrt2 ~ pronoun + (1 | workerid), data = NeutralCon)
summary(m)
