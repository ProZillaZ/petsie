export class BreedModel {
  name: string;
  type: string;
  size: number;
  kidFriendly: number;
  animalFriendly: number;
  lowShedding: number;
  easyToGroom: number;
  energy: number;
  health: number;
  quietness: number;
  intelligence: number;
  trainable: number;
  standHot: number;
  standCold: number;
  show:boolean;
  sure:number;

  constructor(obj?: any) {
    this.name                  = obj && obj.name                  || '';
    this.type                  = obj && obj.type                  || '';
    this.size                  = obj && obj.size                  || 0;
    this.kidFriendly           = obj && obj.kidFriendly           || 0;
    this.animalFriendly        = obj && obj.animalFriendly        || 0;
    this.lowShedding           = obj && obj.lowShedding           || 0;
    this.easyToGroom           = obj && obj.easyToGroom           || 0;
    this.energy                = obj && obj.energy                || 0;
    this.health                = obj && obj.health                || 0;
    this.quietness             = obj && obj.quietness             || 0;
    this.intelligence          = obj && obj.intelligence          || 0;
    this.trainable             = obj && obj.trainable             || 0;
    this.standHot              = obj && obj.standHot              || 0;
    this.standCold             = obj && obj.standCold             || 0;
    this.sure                  = obj && obj.sure                  || 0;
    this.show = true;
  }
}
