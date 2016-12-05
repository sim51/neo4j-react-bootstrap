/**
 * Configuration object for the Sigma Layout
 */
const sigmaGraphStyle = {
	labels: {
    Movie: {
      // node's field to display as label
      label: 'title',
      // color of the node
      color: '#3895ff',
      // Size of the node
      size: 15,
      // Choose an icon (or not) for the label
      icon: {
        font: 'FontAwesome',
        scale: 1.0, // size ratio of (icon / node)
        // color of the icon
        color: '#fff',
        // unicode code of the icon, @see fontawesome website
        content: "\uf008"
      }
    },
    Person: {
      label: 'name',
      color: '#FF756E',
      size: 15,
      icon: {
        font: 'FontAwesome',
        scale: 1.0, // size ratio of (icon / node)
        color: '#fff',
        content: "\uf007"
      }
    }
  },
  edges: {
  }
}

export default sigmaGraphStyle;
