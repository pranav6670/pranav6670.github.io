---
title: "Detection of Tabla taalas from Indian Classical Music"
date: 2019-06-29
tags: [Deep Learning, Audio Classification, Data Science]
header:
  image: "/images/tabla.jpg"
excerpt: "Deep Learning, Data Science"
author_profile: true
mathjax: true
classes: wide
toc: true
toc_label: "Table of contents"
toc_icon: "cog"
---

---

# Introduction

{: .notice--info}
<div style="text-align: justify">
This project work aims on developing a system that would be able to first detect a <a href="https://en.wikipedia.org/wiki/Tabla">tabla</a> <a href="https://en.wikipedia.org/wiki/Tala_(music)">tala</a>
from a mix(a song) of an Indian or Carnatic Classical Music and then classify the tala. Tala is specific pattern which occurs in all of the Indian Classical Music and Tabla is percussive accompanying instrument.
</div>

---

# Motivation

{: .notice--info}
<div style="text-align: justify">
The work done by people around the world from the Music Information Retrieval<a href="https://en.wikipedia.org/wiki/Music_information_retrieval">(MIR)</a> community revolves around the western music, their genres and their instruments, but not significant work has been carried around Indian Classical Music and specifically tabla. The main objective of the project was to make the system real-time. The attempt on making the system real-time has not been done so far. Also, this could be the starting point to study the several prospects of the Indian Classical Music. To the best of our knowledge, there have been only few attempts on tala classification using Deep Learning and making it real-time. Also, the attempts made in bol transcription use the classical machine learning techniques which may not be able to make classification robust.
</div>

---

# Objectives

{: .notice--primary}
* <div style="text-align: justify">
   Separate the input audio signals into its respective harmonic and percussive components :-
   Separation of a given mix is performed using the algorithm known as Harmonic-Percussive Source Separation.
   Check out <a href="https://librosa.github.io/librosa/auto_examples/plot_hprss.html">HPSS</a>
   </div>

{: .notice--primary}
* Collect/generate suitable audio files/loops for the problem which consists of Tabla.

{: .notice--primary}
* Preprocess the percussive component and extract the features :-
   Preprocessing includes down-sampling audio and cleaning the samples using noise-threshold detection.

{: .notice--primary}
* Collect/generate the data required for training/testing the model or algorithm for classification.

{: .notice--primary}
* To get training accuracy > 80% and validation accuracy > 70%.

{: .notice--primary}
* To make the system Real-Time.

---

# Methodology

{: .notice--success}
+ Data was collected by recording the talas played from an iOS [app](https://apps.apple.com/us/app/itablapro-  lite/id919001492) from a mic.

{: .notice--success}
* Raw Audio :-
<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/timedata.png" alt="Raw audio">

{: .notice--success}
* Fourier Transform of the raw audio :-
<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/data_ft.png" alt="FT of the data">

{: .notice--success}
* Filter bank energies :-
<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/filterbankenergies.png" alt="Filter bank energies">

{: .notice--success}
* MFCCs of the data :-
<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/data_mfccs.png" alt="MFCCs">

{: .notice--success}
+ Data was pre-processed(Down-Sampling & Noise Threshold Detection)

{: .notice--success}
+ Data was visualized.
<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/distribution.png" alt="Data distribution">

{: .notice--success}
+ <div style="text-align: justify">
  A Convolutional Neural Network(CNN) and a Long Short Term Memory(LSTM) network was trained on the
  Mel Frequency Cepstral Coefficients(MFCCs) of 1/10<sup>th</sup> second of the data resulting in a large number of samples generated.</div>

{: .notice--success}
+ An unknown sample was given as an input containing instruments other than tabla. The harmonic component    was filtered by HPSS algorithm and the percussive component was used for classification.

---

## My GUI :-

{: .notice--success}
The GUI was made using PyQt5.

<img src="{{ site.url }}{{ site.baseurl }}/images/Tabla project/GUI.png" alt="GUI">

---

# Model graphs and summaries :-

  1. CNN Graph and summary

{: .notice--success}
![image-right](/images/Tabla project/convmodel.png){: .align-right}

{: .notice--success}
The model graph is shown on the right side. This graph is the result of `plot_model` function available under `keras.utils.vis_utils`. The accuracy of >80% was achieved by pruning and adding layers to these networks.

{: .notice--success}
The code for model is:-

```python
def get_conv_model():
    model = Sequential()
    model.add(Conv2D(16, (3, 3), activation='relu', strides=(1, 1),
                     padding='same', input_shape=input_shape))
    model.add(Conv2D(32, (3, 3), activation='relu', strides=(1,1),
                     padding='same'))
    model.add(Conv2D(64, (3, 3), activation='relu', strides=(1,1),
                     padding='same'))
    model.add(Conv2D(128, (3, 3), activation='relu', strides=(1,1),
                     padding='same'))
    model.add(MaxPool2D(2, 2))
    model.add(Dropout(0.5))
    model.add(Flatten())
    model.add(Dense(128, activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(8, activation='softmax')) # Change
    model.summary()
    model.compile(loss='categorical_crossentropy',
                  optimizer='adam',
                  metrics=['acc'])
    return model
```

---

![image-left](/images/Tabla project/conv_summ.png){: .align-left}

{: .notice--success}
The summary for the above model is shown on the right side. The model summary can be printed to a console by first loading a saved model by using `load_model` method under `keras.models` and then using a `model.summary("your-model-name")`

---

  2. LSTM Graph and summary

![image-right](/images/Tabla project/recmodel.png){: .align-right}

{: .notice--success}
Code for LSTM model:-

```python
def get_recurrent_model():
    model = Sequential()
    model.add(LSTM(128, return_sequences=True, input_shape=input_shape))
    model.add(LSTM(128, return_sequences=True))
    model.add(Dropout(0.5))
    model.add(TimeDistributed(Dense(64, activation='relu')))
    model.add(TimeDistributed(Dense(32, activation='relu')))
    model.add(TimeDistributed(Dense(16, activation='relu')))
    model.add(TimeDistributed(Dense(8, activation='relu')))
    model.add(Flatten())
    model.add(Dense(8, activation='softmax')) # Change
    model.summary()
    model.compile(loss='categorical_crossentropy',
                  optimizer='adam',
                  metrics=['acc'])
    return model
```
---

![image-left](/images/Tabla project/rec_summ.png){: .align-left}

{: .notice--success}
Example of plotting a model is as follows:-

```python
from keras.models import load_model
from keras.utils.vis_utils import plot_model

conv_model = load_model('/home/pranav/Desktop/models_training#1/conv.model')
rec_model = load_model('/home/pranav/Desktop/models_training#1/rec.model')

graph = plot_model(conv_model, to_file='convmodel.png', show_shapes=True,
                   show_layer_names=True)

graph1 = plot_model(rec_model, to_file='recmodel.png', show_shapes=True,
                    show_layer_names=True)

  ```
---

## Helpful Links regarding the project topics :-

1. [MFCC](https://haythamfayek.com/2016/04/21/speech-processing-for-machine-learning.html)
2. [CNN](http://yann.lecun.com/exdb/publis/pdf/lecun-bengio-95a.pdf)
3. [LSTM](https://www.analyticsvidhya.com/blog/2017/12/fundamentals-of-deep-learning-introduction-to-lstm/)

---

> The actual implementation of mine can be found [here](https://github.com/pranav6670/Detection-Classification-of-Tabla-taals)

> Inspiration for the project -> [Seth Adams](https://www.youtube.com/watch?v=Z7YM-HAz-IY&list=PLhA3b2k8R3t2Ng1WW_7MiXeh1pfQJQi_P)
>>*Please check him out*

---
