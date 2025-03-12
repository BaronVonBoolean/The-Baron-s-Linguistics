import { AnnotationConverter } from "../classes/phonology/AnnotationConverter";
import { CMUDict } from "../classes/phonology/CMUDict";

const cmu = new CMUDict('./data/cmudict.txt');

const annotationConvert = new AnnotationConverter(
  './data/charmaps/arpa2ipa.txt',
  './data/charmaps/ipa2ascii.txt'
);

export function injectCMU():CMUDict {
  return cmu;
}

export function injectAnnotationConverter(flavor: string = 'ipa'):AnnotationConverter {
  return annotationConvert
}
