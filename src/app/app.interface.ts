export interface ICharacter {
  id: number; // Уникальный идентификатор персонажа
  name: string; // Имя персонажа
  status: string; // Статус персонажа (например, Alive, Dead, Unknown)
  species: string; // Вид персонажа (например, Human, Alien)
  type: string; // Дополнительный тип персонажа, если указан
  gender: string; // Пол персонажа (Male, Female, Genderless, Unknown)
  origin: {
    name: string; // Название места происхождения
    url: string; // URL места происхождения
  };
  location: {
    name: string; // Название текущего местоположения
    url: string; // URL текущего местоположения
  };
  image: string; // Ссылка на изображение персонажа
  episode: string[]; // Массив ссылок на эпизоды, в которых появился персонаж
  url: string; // URL на полный объект персонажа
  created: string; // Дата и время создания объекта в формате ISO
}
