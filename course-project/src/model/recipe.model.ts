export class Recipe {

  // static Builder = class {
  //
  //   public name: String;
  //   public description: String;
  //   public imagePath: String;
  //
  //   withName(name: String) {
  //     this.name = name;
  //     return this;
  //   }
  //
  //   withDescription(description: String) {
  //     this.description = description;
  //     return this;
  //   }
  //
  //   withImagePath(imagePath: String) {
  //     this.imagePath = imagePath;
  //     return this;
  //   }
  //
  //   build() {
  //     return new Recipe(this.name, this.description, this.imagePath);
  //   }
  //
  // };

  public name: String;
  public description: String;
  public imagePath: String;

  constructor(name: String, description: String, imagePath: String) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
  }

}
