type MergeTagsType = {
  bookTags: Array<any>;
  allTags: Array<any>;
};

export function mergeTags({ bookTags, allTags }: MergeTagsType) {
  allTags.forEach(tag => {
    tag.selected = Object.values(bookTags).indexOf(tag.name) > -1;
  });

  return allTags;
}

export function generateCurrentTimestamp() {
  const d = new Date();
  return [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('-') +
    ' ' +
    [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
}
