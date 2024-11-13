import { 
  Switch,
  Listbox,
  Dialog,
  Transition 
} from '@headlessui/react';
import { useState, Fragment } from 'react';
import styles from './my-headless-ui-component.module.scss';

interface NotificationType {
  id: number;
  name: string;
  icon: string;
}

const notificationTypes: NotificationType[] = [
  { id: 1, name: 'Email', icon: '📧' },
  { id: 2, name: 'SMS', icon: '📱' },
  { id: 3, name: 'Push Notification', icon: '🔔' },
];

export default function MyHeadlessUIComponent(): JSX.Element {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [selected, setSelected] = useState<NotificationType>(notificationTypes[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Profile Settings</h2>

        {/* Name Field */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Name
            <p className={styles.description}>
              Use your real name so people will recognize you.
            </p>
            <input
              type="text"
              className={styles.input}
              placeholder="John Doe"
            />
          </label>
        </div>

        {/* Email Field */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Email
            <p className={styles.description}>
              Your email address for communications.
            </p>
            <input
              type="email"
              className={styles.input}
              placeholder="john@example.com"
            />
          </label>
        </div>

        {/* Notification Type Dropdown */}
        <div className={styles.inputGroup}>
          <span className={styles.label}>Notification Preference</span>
          <Listbox value={selected} onChange={setSelected}>
            <div className={styles.listbox}>
              <Listbox.Button className={styles.listboxButton}>
                <span>
                  {selected.icon} {selected.name}
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className={styles.listboxOptions}>
                  {notificationTypes.map((type) => (
                    <Listbox.Option
                      key={type.id}
                      value={type}
                      className={styles.listboxOption}
                    >
                      {({ selected }) => (
                        <span>
                          {type.icon} {type.name}
                        </span>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* Toggle Switch */}
        <div className={styles.switch}>
          <Switch.Group>
            <div>
              <Switch.Label className={styles.label}>
                Enable notifications
              </Switch.Label>
              <p className={styles.description}>
                Receive updates about your account activity.
              </p>
            </div>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${enabled ? styles.switchActive : styles.switchInactive}`}
            />
          </Switch.Group>
        </div>

        {/* Save Button */}
        <button
          onClick={() => setIsOpen(true)}
          className={styles.button}
        >
          Save Changes
        </button>

        {/* Modal */}
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className={styles.modal}
        >
          <div className={styles.modalOverlay} />
          <div className={styles.modalContainer}>
            <Dialog.Panel className={styles.modalPanel}>
              <Dialog.Title className={styles.modalTitle}>
                Confirm Changes
              </Dialog.Title>
              <Dialog.Description className={styles.modalDescription}>
                Are you sure you want to save these changes to your profile?
              </Dialog.Description>

              <div className={styles.modalButtons}>
                <button
                  className={styles.button}
                  onClick={() => setIsOpen(false)}
                >
                  Confirm
                </button>
                <button
                  className={`${styles.button} ${styles.buttonSecondary}`}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
