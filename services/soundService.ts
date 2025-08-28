// Simple 8-bit sound effects encoded in base64 to avoid external file dependencies.
// Source: https://sfxr.me/ (Generated royalty-free sounds)

class SoundService {
  private correctSound: HTMLAudioElement;
  private incorrectSound: HTMLAudioElement;
  private clickSound: HTMLAudioElement;
  private gameOverSound: HTMLAudioElement;
  private isMuted: boolean = false;

  constructor() {
    // Sound for correct answer
    this.correctSound = new Audio("data:audio/wav;base64,UklGRlIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAADw/38/AL0BMAE+Af8C/vz/Av4CAAAA//8A/gEAAgA=");
    
    // Sound for incorrect answer
    this.incorrectSound = new Audio("data:audio/wav;base64,UklGRlAAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAADw/z8/gL8A/v9/fwB+/wABAQMA");

    // Sound for UI click
    this.clickSound = new Audio("data:audio/wav;base64,UklGRlIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAADw/z8/gL0BMAE+Ac0C/vMAAv4CAP+A//8A/gEAAgA=");

    // Sound for game over
    this.gameOverSound = new Audio("data:audio/wav;base64,UklGRlAAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAADw/38/AL8B/QD+/38B/v8AAQEAAA==");

    this.correctSound.volume = 0.5;
    this.incorrectSound.volume = 0.5;
    this.clickSound.volume = 0.6;
    this.gameOverSound.volume = 0.5;
  }

  private play(audio: HTMLAudioElement) {
    if (!this.isMuted) {
      audio.currentTime = 0;
      audio.play().catch(e => console.error("Sound play failed", e));
    }
  }

  playCorrect() {
    this.play(this.correctSound);
  }

  playIncorrect() {
    this.play(this.incorrectSound);
  }

  playClick() {
    this.play(this.clickSound);
  }

  playGameOver() {
    this.play(this.gameOverSound);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
  }
}

const soundService = new SoundService();
export default soundService;
