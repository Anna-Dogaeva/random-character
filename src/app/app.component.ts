import {Component, effect, OnInit, resource, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ICharacter} from "./app.interface";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
})
export class AppComponent {
  query = signal(0);
  character = resource<ICharacter, unknown>(
    {
      request: () => {
        return this.query();
      },
      loader: async ({request, abortSignal}) => {
        const character = await fetch(`https://rickandmortyapi.com/api/character/${request}`, {
          signal: abortSignal,
        });
        if(!character.ok) {
          throw Error('Could not fetch')
        }
        return await character.json();
      }
    }
  );

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomCharacter() {
    this.query.set(this.getRandomNumber(1, 826));
  }
}
