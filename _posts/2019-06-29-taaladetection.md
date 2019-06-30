---
title: "Detection of Tabla taalas from Indian Classical Music"
date: 2019-06-29
tags: [Deep Learning, Audio Classification, Data Science]
header:
  image: "/images/tabla.jpg"
excerpt: "Deep Learning, Data Science"
author_profile: false
mathjax: true
---

---

# Introduction

{: .notice--primary}
<div style="text-align: justify">
This project work aims on developing a system that would be able to first detect a <a href="https://en.wikipedia.org/wiki/Tabla">tabla</a> <a href="https://en.wikipedia.org/wiki/Tala_(music)">tala</a>
from a mix(a song) of an Indian or Carnatic Classical Music and then classify the tala. Tala is specific pattern which occurs in all of the Indian Classical Music and Tabla is percussive accompanying instrument.
</div>

---

# Motivation

<div style="text-align: justify">
The work done by people around the world from the Music Information Retrieval<a href="https://en.wikipedia.org/wiki/Music_information_retrieval">(MIR)</a> community revolves around the western music, their genres and their instruments, but not significant work has been carried around Indian Classical Music and specifically tabla. The main objective of the project was to make the system real-time. The attempt on making the system real-time has not been done so far. Also, this could be the starting point to study the several prospects of the Indian Classical Music. To the best of our knowledge, there have been only few attempts on tala classification using Deep Learning and making it real-time. Also, the attempts made in bol transcription use the classical machine learning techniques which may not be able to make classification robust.
</div>

---

# Objectives

1. <div style="text-align: justify">
   Separate the input audio signals into its respective harmonic and percussive components :-
   Separation of a given mix is performed using the algorithm known as Harmonic-Percussive Source Separation.
   Check out [HPSS](https://librosa.github.io/librosa/auto_examples/plot_hprss.html)</div>

2. Collect/generate suitable audio files/loops for the problem which consists of Tabla.

3. Preprocess the percussive component and extract the features :-
   Preprocessing includes down-sampling audio and cleaning the samples using noise-threshold detection.

4. Collect/generate the data required for training/testing the model or algorithm for classification.

5. To get training accuracy > 80% and validation accuracy > 70%.

6. To make the system Real-Time.

---

# Methodology
1. Data was collected by recording the talas played from an iOS [app](https://apps.apple.com/us/app/itablapro-  lite/id919001492) from a mic.

* Raw Audio :-
<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/timedata.png" alt="Raw audio">
* Fourier Transform of the raw audio :-
<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/data_ft.png" alt="FT of the data">
* Filter bank energies :-
<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/filterbankenergies.png" alt="Filter bank energies">
* MFCCs of the data :-
<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/data_mfccs.png" alt="MFCCs">

2. Data was pre-processed(Down-Sampling & Noise Threshold Detection)

3. Data was visualized.
<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/distribution.png" alt="Data distribution">

4. <div style="text-align: justify">
  A Convolutional Neural Network(CNN) and a Long Short Term Memory(LSTM) network was trained on the
  Mel Frequency Cepstral Coefficients(MFCCs) of 1/10<sup>th</sup> second of the data resulting in a large number of samples generated.</div>

5. An unknown sample was given as an input containing instruments other than tabla. The harmonic component    was filtered by HPSS algorithm and the percussive component was used for classification.

---

# My GUI :-

The GUI was made using PyQt5.

<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/GUI.png" alt="GUI">

---

# Model graphs and summaries :-

+ Model Graphs :-
1. CNN Graph and summary
{: .align-left}
<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/convmodel.png" alt="cnnGraph">

{: .align-left}
<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/conv_summ.png" alt="cnnSummary">

---

+ Model Summaries :-
<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/recmodel.png" alt="lstmGraph">
<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/rec_summ.png" alt="lstmGraph">

---

## Helpful Links regarding the project topics :-

1. [MFCC](https://haythamfayek.com/2016/04/21/speech-processing-for-machine-learning.html)
2. [CNN](http://yann.lecun.com/exdb/publis/pdf/lecun-bengio-95a.pdf)
3. [LSTM](https://www.analyticsvidhya.com/blog/2017/12/fundamentals-of-deep-learning-introduction-to-lstm/)

---

> The actual implementation of mine can be found [here](https://github.com/pranav6670/Detection-Classification-of-Tabla-taals)

> [Inspiration for the project](https://www.youtube.com/watch?v=Z7YM-HAz-IY&list=PLhA3b2k8R3t2Ng1WW_7MiXeh1pfQJQi_P)
>>*Please check him out*

---
