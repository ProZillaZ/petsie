export class VisionModel {
  requests:RequestModel[];

  constructor(obj?: any) {
    this.requests              = obj && obj.requests              || [];
  }
}
export class RequestModel {
  image:{
    content:string
  };
  features:FeatureModel[];

  constructor(obj?: any) {
    this.image                 = obj && obj.image                || {content:''};
    this.features              = obj && obj.features             || [];
  }
}
export class FeatureModel {
  type:string;
  maxResults:number;

  constructor(obj?: any) {
    this.type                  = obj && obj.type                  || '';
    this.maxResults            = obj && obj.maxResults            || 0;
  }
}
export class AnnotationModel {
  mid:string;
  description:string;
  score:number;
  topicality:number;

  constructor(obj?: any) {
    this.mid                   = obj && obj.mid                   || '';
    this.description           = obj && obj.description           || '';
    this.score                 = obj && obj.score                 || 0;
    this.topicality            = obj && obj.topicality            || 0;
  }
}
