import styles from "./Datten.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import Link from "next/link"

export interface DatTenProps {
  icon: IconProp
  name: string
  to?: string
  button?: Function
  bigSize?: boolean
  // any DatTenprops that come into the component
}

function Datten({ icon, name, to, bigSize, button }: DatTenProps) {
  if (to) {
    return (
      <div>
        <Link
          href={to!}
          onClick={(e) => {
            button!()
          }}
        >
          <div
            className={styles.wrapper.concat(
              " ",
              bigSize ? styles.bigSidebar : styles.smallSidebar
            )}
          >
            <FontAwesomeIcon icon={icon} className={styles.icon} />

            {bigSize ? <span>{name}</span> : <></>}
          </div>
        </Link>
      </div>
    )
  }
  if (button) {
    return (
      <div
        className={styles.wrapper.concat(
          " ",
          bigSize ? styles.bigSidebar : styles.smallSidebar
        )}
        onClick={() => {
          button()
        }}
      >
        <FontAwesomeIcon icon={icon} className={styles.icon} />
        {bigSize ? <span>{name}</span> : <></>}
      </div>
    )
  }
  return (
    <div
      className={styles.wrapper.concat(
        " ",
        bigSize ? styles.bigSidebar : styles.smallSidebar
      )}
    >
      <FontAwesomeIcon icon={icon} className={styles.icon} />
      {bigSize ? <span>{name}</span> : <></>}
    </div>
  )
}

export default Datten
