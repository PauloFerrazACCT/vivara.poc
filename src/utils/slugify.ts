/* eslint-disable no-useless-escape */
export function slugify(value: string) {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźżÀÁÂÄÆÃÅĀĂĄÇĆČĐĎÈÉÊËĒĖĘĚĞǴḦÎÏÍĪĮÌŁḾÑŃǸŇÔÖÒÓŒØŌÕŐṔŔŘŚŠŞȘŤȚÛÜÙÚŪǗŮŰŲẂẌŸÝŽŹŻ·/_,:;'

  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzzAAAAAAAAAACCCDDEEEEEEEEGGHIIIIIILMNNNNOOOOOOOOOPRRSSSSTTUUUUUUUUUWXYYZZZ------'

  const p = new RegExp(a.split('').join('|'), 'g')

  return value
    .toString()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters

    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters

    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export function slugifyUrl(value: string) {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźżÀÁÂÄÆÃÅĀĂĄÇĆČĐĎÈÉÊËĒĖĘĚĞǴḦÎÏÍĪĮÌŁḾÑŃǸŇÔÖÒÓŒØŌÕŐṔŔŘŚŠŞȘŤȚÛÜÙÚŪǗŮŰŲẂẌŸÝŽŹŻ·_,:;'

  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzzAAAAAAAAAACCCDDEEEEEEEEGGHIIIIIILMNNNNOOOOOOOOOPRRSSSSTTUUUUUUUUUWXYYZZZ-----'

  const p = new RegExp(a.split('').join('|'), 'g')

  return value
    .toString()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters

    .replace(/\./g, '-')

    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '')
}
