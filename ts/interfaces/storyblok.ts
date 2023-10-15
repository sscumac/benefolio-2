import { ISbRichtext } from "@storyblok/vue";

interface TagStoryblok {
  text: string;
}

interface MultilinkStoryblok {
  cached_url: string;
}

interface NavLinkStoryblok {
  text: string;
  link: MultilinkStoryblok;
}

interface ImageStoryblok {
  alt: string;
  filename: string;
  id: number;
}

interface ProjectContentStoryblok {
  title_image: ImageStoryblok;
  text: ISbRichtext | any;
  images: ImageStoryblok[];
  sub_title: string;
  bottom_notice: string;
}

interface ImpressumStoryblok {
  text_element: ISbRichtext;
  _uid: string;
}

export interface InfoStoryblok {
  credits: string;
  kontakt: string;
  portrait: ImageStoryblok;
  impressum: ImpressumStoryblok[];
  info_text: ISbRichtext;
}

export interface ProjectStoryblok {
  slug: string;
  id: number;
  name: string;
  content: ProjectContentStoryblok;
}

export interface AllProjectsStoryblok {
  projects: ProjectStoryblok[];
}

export interface HeaderStoryblok {
  tags: TagStoryblok[];
  navBar: NavLinkStoryblok[];
}

interface StoryContentStoryblok {
  _uid: number;
  component: string;
}

export interface StoryStoryblok {
  id: number;
  content: StoryContentStoryblok;
}
