import { useEffect, useRef } from "react";

export function FireworksCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];
    let rockets = [];

    class Rocket {
      constructor(startX, startY, targetX, targetY) {
        this.x = startX;
        this.y = startY;
        this.startX = startX;
        this.startY = startY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.distanceToTarget = Math.hypot(targetX - startX, targetY - startY);
        this.distanceTraveled = 0;
        this.coordinates = [];
        this.coordinateCount = 3;
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.atan2(targetY - startY, targetX - startX);
        this.speed = 3 + Math.random() * 4;
        this.acceleration = 1.035;
        this.hue = Math.random() * 360;
      }

      update(index) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        this.speed *= this.acceleration;

        const vx = Math.cos(this.angle) * this.speed;
        const vy = Math.sin(this.angle) * this.speed;
        this.distanceTraveled = Math.hypot(this.x + vx - this.startX, this.y + vy - this.startY);

        if (this.distanceTraveled >= this.distanceToTarget) {
          createParticles(this.targetX, this.targetY, this.hue);
          rockets.splice(index, 1);
        } else {
          this.x += vx;
          this.y += vy;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsl(${this.hue}, 100%, 60%)`;
        ctx.lineWidth = 3.5;
        ctx.stroke();
      }
    }

    class Particle {
      constructor(x, y, hue) {
        this.x = x;
        this.y = y;
        this.coordinates = [];
        this.coordinateCount = 5;
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 7 + 3;
        this.friction = 0.95;
        this.gravity = 0.15;
        this.hue = hue + (Math.random() * 50 - 25);
        this.brightness = Math.random() * 20 + 60;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.012;
      }

      update(index) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;

        if (this.alpha <= this.decay) {
          particles.splice(index, 1);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
        ctx.lineWidth = Math.random() * 2.5 + 1.5;
        ctx.stroke();
      }
    }

    const createParticles = (x, y, hue) => {
      let particleCount = 40;
      while (particleCount--) {
        particles.push(new Particle(x, y, hue));
      }
    };

    let timerTick = 0;
    let timerTotal = 24;

    const tick = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      let i = rockets.length;
      while (i--) {
        rockets[i].draw();
        rockets[i].update(i);
      }

      let j = particles.length;
      while (j--) {
        particles[j].draw();
        particles[j].update(j);
      }

      if (timerTick >= timerTotal) {
        rockets.push(
          new Rocket(
            0,
            canvas.height,
            canvas.width * 0.15 + Math.random() * (canvas.width * 0.25),
            canvas.height * 0.15 + Math.random() * (canvas.height * 0.3)
          )
        );
        rockets.push(
          new Rocket(
            canvas.width,
            canvas.height,
            canvas.width * 0.6 + Math.random() * (canvas.width * 0.25),
            canvas.height * 0.15 + Math.random() * (canvas.height * 0.3)
          )
        );
        timerTick = 0;
      } else {
        timerTick++;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
        backgroundColor: "transparent",
      }}
    />
  );
}
