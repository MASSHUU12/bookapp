type MergeTagsType = {
  bookTags: Array<any>;
  allTags: Array<any>;
};

export const mergeTags = ({ bookTags, allTags }: MergeTagsType): any[] => {
  allTags.forEach(tag => {
    tag.selected = Object.values(bookTags).indexOf(tag.name) > -1;
  });

  return allTags;
};

export const generateCurrentTimestamp = (): string => {
  const d = new Date();
  return `${
    [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('-') +
    ' ' +
    [d.getHours(), d.getMinutes(), d.getSeconds()].join(':')
  }`;
};
