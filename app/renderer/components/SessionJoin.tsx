import React, { Component } from 'react'
import styles from './SessionJoin.css'
import LayoutMain from 'renderer/components/layout/Main'
import { MenuButton } from 'renderer/components/menu/MenuButton'
import { TextInput, InputGroup } from './common/input'
import { MenuHeader } from './menu/MenuHeader'
import { t } from '../../locale/index'
import { PRODUCT_NAME } from 'constants/app'
import { assetUrl } from 'utils/appUrl'
import { ExternalLink } from './common/link'
import { DISCORD_INVITE_URL } from 'constants/social'

interface IProps {
  connect: (sessionId: string) => void
}

export class SessionJoin extends Component<IProps> {
  private sessionInput: HTMLInputElement | null = null

  render(): JSX.Element | null {
    return (
      <LayoutMain className={styles.container}>
        <MenuHeader text={t('joinSession')} />
        <section>
          <form onSubmit={e => e.preventDefault()}>
            <p>{t('enterJoinDest')}</p>
            <InputGroup>
              <TextInput
                theRef={el => (this.sessionInput = el)}
                className={styles.peerId}
                placeholder={t('friendCode')}
                defaultValue={localStorage.getItem('prevFriendCode') || undefined}
                spellCheck={false}
                autoFocus
                required
              />
              <MenuButton
                icon="globe"
                size="medium"
                onClick={() => {
                  const valid = Boolean(this.sessionInput && this.sessionInput.checkValidity())
                  if (valid) {
                    const value = this.sessionInput!.value.trim()
                    localStorage.setItem('prevFriendCode', value)
                    this.props.connect(value)
                  } else {
                    this.sessionInput!.classList.add('invalid')
                  }
                }}
              >
                {t('join')}
              </MenuButton>
            </InputGroup>
          </form>
        </section>
        <section className={styles.discovery}>
          <h2 className={styles.header}>Find Sessions</h2>
          <p>
            Join the <strong>#sessions</strong> channel on the {PRODUCT_NAME} Discord community to
            find other users’ sessions. Click the Discord logo below to join.
            <ExternalLink href={DISCORD_INVITE_URL}>
              <img
                src={assetUrl('icons/social/discord-color.svg')}
                className={styles.discordLogo}
              />
            </ExternalLink>
          </p>
        </section>
      </LayoutMain>
    )
  }
}
