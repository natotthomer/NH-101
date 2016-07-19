# NOH101

### Summary

A simple polyphonic synthesizer (live demo here: [!]), using analog-style subtractive synthesis as the
basis and taking basic architectural inspiration from classic Roland analog
synthesizers, such as the Juno-60 and the SH-101. Three waveforms are combined
(square, sawtooth and triangle), mixed and filtered together for a big, fat sound.
They are slightly detuned from one another (101%, 99% and 100% of the designated frequency, respectively)
for a slightly warbling, chorus effect-like sound. This lends a more unstable, but
more musical tone.

JavaScript and React.js are the core of this project. I wanted to use the React.js library
because it seemed to be a natural choice since there were a lot of moving parts and lot of
changing parameters. I utilized the MDN Web Audio API to provide the core of the NH-101's sound generation and
modulation. jQuery handles key listeners for keyDown & keyUp actions, triggering note on and off.

### MVP

- [x] A clean, clear design
- [x] A single oscillator sound-source, with individual gain amounts for Square, Triange and Sawtooth waves
- [x] The ability to play the instrument using the computer keyboard over a single octave (accidental keys too)
- [x] A resonant lowpass filter
- [x] A amplifier/gain control
- [x] A triangle-wave LFO, linkable to both the filter cutoff and the amplifier gain

### Wireframes

![NH101](./docs/images/main.jpg)

### Timeline

#### Phase 1: Basic VCO & Keyboard

- [x] Build out keyboard
- [x] Single sound-source

##### Phase 2: Basic interface

- [x] Keyboard interface
- [x] Master Volume slider

##### Phase 3: Basic oscillator mixer

- [x] Gain sliders for Tri, Saw, & Square

##### Phase 4: Filter

- [x] Attach basic lowpass filter

##### Phase 5: Wrap Up interface

- [x] CSS
- [x] Better design

##### Bonus Features:

- [x] Sub-oscillator
- [ ] Arpeggiator
- [ ] ADSR envelope
- [x] LFO
- [x] Resonance on filter
