import yuliyaPhoto from '../assets/photos/yulia_photo.jpg';
import slavaPhoto from '../assets/photos/slava_photo.jpg';
import nastyaPhoto from '../assets/photos/anastasia_photo.jpg';
import { AboutUsType } from './types';

export const ABOUT_US: AboutUsType[] = [
  {
    fullName: 'Kuzich Yulia',
    img: yuliyaPhoto,
    github: 'https://github.com/yulyakuzich',
    nameKey: 'yuliaName',
    roleKey: 'yuliaRole',
    bioKey: 'yuliaBio',
  },
  {
    fullName: 'Kozlova Anastasiya',
    img: nastyaPhoto,
    github: 'https://github.com/anastakozz',
    nameKey: 'anastasiyaName',
    roleKey: 'anastasiyaRole',
    bioKey: 'anastasiyaBio',
  },
  {
    fullName: 'Ryshkov Vyacheslav',
    img: slavaPhoto,
    github: 'https://github.com/SlaVR7',
    nameKey: 'vyacheslavName',
    roleKey: 'vyacheslavRole',
    bioKey: 'vyacheslavBio',
  },
];
