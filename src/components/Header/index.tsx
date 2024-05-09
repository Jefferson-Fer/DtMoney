import { HeaderContainer, HeaderContent, NewButtonTransaction } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import Logo from '../../assets/Logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={Logo} alt="Logotipo" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewButtonTransaction>Nova Transação</NewButtonTransaction>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
