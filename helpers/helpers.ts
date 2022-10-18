type MergeTagsType = {
  bookTags: Array<any>;
  allTags: Array<any>;
};

export function mergeTags({ bookTags, allTags }: MergeTagsType) {
  allTags.forEach(tag => {
    if (Object.values(bookTags).indexOf(tag.name) > -1) {
      tag.selected = true;
    } else {
      tag.selected = false;
    }
  });

  return allTags;
}
