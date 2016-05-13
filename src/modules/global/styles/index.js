export default {
  column: {
    boxSizing: 'border-box',
    display: 'flex',
    flexGrow: 1,
    flexBasis: 0,
    flexDirection: 'column',
    msFlex: '1 0'
  },
  row: {
    boxSizing: 'border-box',
    display: 'flex',
    flexGrow: 1,
    flexBasis: 0,
    msFlex: '1 0',
    flexDirection: 'row'
  },
  panel: {
    boxSizing: 'border-box',
    flexGrow: 1,
    flexBasis: 0,
    borderRadius: '0.5rem',
    boxShadow: '0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.1)',
    background: '#fff'
  },
  heading: {
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  padding: (t, r, b, l) => {
    return {
      paddingTop: `${t}rem`,
      paddingRight: `${isNaN(r) && t || r}rem`,
      paddingBottom: `${isNaN(b) && t || b}rem`,
      paddingLeft: `${isNaN(l) && t || l}rem`
    }
  },
  margin: (t, r, b, l) => {
    return {
      marginTop: `${t}rem`,
      marginRight: `${isNaN(r) && t || r}rem`,
      marginBottom: `${isNaN(b) && t || b}rem`,
      marginLeft: `${isNaN(l) && t || l}rem`
    }
  },
  pullRight: {
    float: 'right'
  }
}
