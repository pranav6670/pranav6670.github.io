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

### H3 Heading

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
