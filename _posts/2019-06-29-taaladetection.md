---
title: "Detection of Tabla taalas from Indian Classical Music"
date: 2019-06-29
tags: [Deep Learning, Audio Classification, Data Science]
header:
  image: "/images/tabla.jpg"
excerpt: "Deep Learning, Data Science"
mathjax: true
---

# Introduction

This project work aims on developing a system that would be able to first *detect* a [tabla](https://en.wikipedia.org/wiki/Tabla) [tala](https://en.wikipedia.org/wiki/Tala_(music)) from a mix(a song) of an Indian or Carnatic Classical Music and then *classify* the tala. Tala is specific pattern which occurs in all of the Indian Classical Music and Tabla is percussive accompanying instrument.

---

# Motivation

The work done by people around the world from the [Music Information Retrieval(MIR)](https://en.wikipedia.org/wiki/Music_information_retrieval) community revolves around the western music, their genres and their instruments, but not significant work has been carried around Indian Classical Music and specifically tabla. The main objective of the project was to make the system real-time. The attempt on making the system real-time has not been done so far. Also, this could be the starting point to study the several prospects of the Indian Classical Music. To the best of our knowledge, there have been only few attempts on tala classification using Deep Learning and making it real-time. Also, the attempts made in bol transcription use the classical machine learning techniques which may not be able to make classification robust.

---

# Objectives

1. Separate the input audio signals into its respective harmonic and percussive components :-
   Separation of a given mix is performed using the algorithm known as Harmonic-Percussive Source Separation[1].
   Check out [HPSS](https://librosa.github.io/librosa/auto_examples/plot_hprss.html)

2. Collect/generate suitable audio files/loops for the problem which consists of Tabla.

3. Preprocess the percussive component and extract the features :-
   Preprocessing includes down-sampling audio and cleaning the samples using noise-threshold detection.

4. Collect/generate the data required for training/testing the model or algorithm for classification.

5. To get training accuracy > 80% and validation accuracy > 70%.

6. To make the system Real-Time.

---

# Methodology

+ Data was collected by recording the talas played from an iOS [app](https://apps.apple.com/us/app/itablapro-  lite/id919001492) from a mic.

+ Data was pre-processed(Down-Sampling & Noise Threshold Detection)

+ Data was visualized.

+ A Convolutional Neural Network(CNN)[2] and a Long Short Term Memory(LSTM)[3] network was trained on the
  Mel Frequency Cepstral Coefficients(MFCCs)[4] of 1/10<sup>th</sup> second of the data resulting in a large number of samples generated.

+ An unknown sample was given as an input containing instruments other than tabla. The harmonic component      was filtered by HPSS algorithm and the percussive component was used for classification.

---

[1]: https://arrow.dit.ie/cgi/viewcontent.cgi?referer=&httpsredir=1&article=1078&context=argcon

Italics
*italics*

Bold
**bold**

Here's my [resume](https://github.com/pranav6670)
Bulleted List
1. One
2. Two

* first
+ Second

Python Code:
```python
  import numpy as np

  def add(x, y):
    return np.sum(x, y)
```

Here's some inline `x + y = z`

Here's an image:
<img src="{{ site.url }}{{ site.baseurl }}/images/distribution.png" alt="Data distribution">

Here's some equations:
$$x+y=z$$
