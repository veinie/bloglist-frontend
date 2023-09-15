import PropTypes from 'prop-types'

const Notification = ({ message, notificationType }) => {
  if (!message) {
    return null
  }

  let notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (notificationType === 'error') {
    notificationStyle.color = 'red'
  }
  else if (notificationType === 'info') {
    notificationStyle.color = 'green'
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  notificationType: PropTypes.string
}

export default Notification