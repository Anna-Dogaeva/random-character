import {Component, resource, ResourceRef, signal, WritableSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ICharacter} from "./app.interface";
import {API_URL} from "./app.constants";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  query: WritableSignal<number | null> = signal(null);
  character: ResourceRef<ICharacter> = resource<ICharacter, number | null>(
    {
      request: () => {
        return this.query();
      },
      loader: async ({request, abortSignal}) => {
        if (this.query() === null) {
          return;
        }
        const character = await fetch(API_URL + request, {
          signal: abortSignal,
        });
        if (!character.ok) {
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
