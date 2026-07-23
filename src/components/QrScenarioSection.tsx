import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import caesarPackage from '../assets/product/caesar-package.png'
import caesarQr from '../assets/product/caesar-qr.png'
import caesarFood from '../assets/food/caesar.png'
import iphoneBack from '../assets/phone/iphone-17-pro-back-premium.png'
import caesarFoodMobile from '../assets/mobile/food/caesar.jpg'
import iphoneBackMobile from '../assets/mobile/iphone-17-pro-back-mobile.png'
import { useIsMobile } from '../hooks/useIsMobile'
import '../styles/qr-scenario.css'

const ease = [0.16, 1, 0.3, 1] as const

function PackageShowcase() {
  return (
    <div className="qr-packaging" aria-label="Упаковка салата Цезарь с QR-кодом">
      <span className="qr-packaging__orbit" aria-hidden="true" />
      <span className="qr-packaging__shadow" aria-hidden="true" />
      <img className="qr-packaging__product" src={caesarPackage} loading="lazy" decoding="async" alt="Упаковка салата Цезарь Точка Роста" />
      <div className="qr-packaging__sticker">
        <img src={caesarQr} loading="lazy" decoding="async" alt="QR-код карточки салата Цезарь" />
        <span>QR / КБЖУ</span>
      </div>
      <div className="qr-packaging__caption">
        <span><i /> Готово к сканированию</span>
        <strong>САЛАТ ЦЕЗАРЬ · 320 ККАЛ</strong>
      </div>
    </div>
  )
}

type PhoneBackProps = {
  scanOpacity: MotionValue<number>
  successOpacity: MotionValue<number>
  reduceMotion: boolean
}

function PhoneBack({ scanOpacity, successOpacity, reduceMotion }: PhoneBackProps) {
  return (
    <div className="qr-phone-back" role="img" aria-label="Задняя сторона iPhone Pro с блоком основных камер, наведённых на QR-код">
      <span className="qr-phone-back__mockup-frame" aria-hidden="true">
        <img className="qr-phone-back__mockup" src={iphoneBack} loading="lazy" decoding="async" alt="" />
      </span>
      <motion.span className="qr-phone-back__sensor-pulse" style={reduceMotion ? { opacity: 0 } : { opacity: scanOpacity }} aria-hidden="true" />

      <motion.div className="qr-phone-back__beam" style={reduceMotion ? { opacity: 0 } : { opacity: scanOpacity }} aria-hidden="true">
        <span /><i /><b />
      </motion.div>

      <motion.div className="qr-phone-back__success" style={reduceMotion ? { opacity: 0 } : { opacity: successOpacity }}>
        <i>✓</i>
        <span><small>QR CAPTURED</small>Блюдо найдено</span>
      </motion.div>
      <span className="qr-phone-back__bottom-glow" aria-hidden="true" />
    </div>
  )
}

function ProductScreen({ imageSrc = caesarFood }: { imageSrc?: string }) {
  const macros = [
    ['320', 'ккал'],
    ['30 г', 'белки'],
    ['12 г', 'жиры'],
    ['18 г', 'углеводы'],
  ]

  return (
    <div className="qr-product-screen">
      <div className="qr-phone-status"><span>9:41</span><span>● ◔ ▰</span></div>
      <div className="qr-product-screen__header"><span>‹</span><strong>Карточка блюда</strong><span>♡</span></div>

      <div className="qr-product-screen__image">
        <img src={imageSrc} loading="lazy" decoding="async" alt="Салат Цезарь с курицей" />
        <div><span>Много белка</span><span>Лёгкий обед</span></div>
      </div>

      <div className="qr-product-screen__body">
        <span className="qr-product-screen__ready"><i /> Готово к покупке</span>
        <h3>Салат Цезарь</h3>
        <p>Курица, романо, сыр и фирменный соус.</p>

        <div className="qr-product-screen__macros">
          {macros.map(([value, label]) => <span key={label}><strong>{value}</strong><small>{label}</small></span>)}
        </div>

        <div className="qr-product-screen__composition">
          <span>Состав</span>
          <p>Куриная грудка, романо, черри, сыр, сухарики, фирменный соус.</p>
        </div>

        <div className="qr-product-screen__fit"><span>Подходит для</span><strong>Баланс · снижение веса</strong></div>

        <div className="qr-product-screen__action">
          <strong>300 ₽</strong>
          <button type="button" tabIndex={-1}>Добавить в рацион <span>+</span></button>
        </div>
      </div>
      <span className="qr-phone-home" aria-hidden="true" />
    </div>
  )
}

function DesktopQrScenarioSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = Boolean(useReducedMotion())
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 92, damping: 28, mass: 0.34 })

  const copyOpacity = useTransform(progress, [0, 0.06, 0.78, 0.93], [0, 1, 1, 0])
  const copyY = useTransform(progress, [0, 0.09, 0.78, 0.93], [34, 0, 0, -42])

  const packageOpacity = useTransform(progress, [0, 0.08, 0.56, 0.74, 0.9], [0, 1, 1, 0.62, 0])
  const packageY = useTransform(progress, [0, 0.16, 0.58, 0.86], [90, 0, -12, -120])
  const packageScale = useTransform(progress, [0, 0.17, 0.58, 0.84], [0.84, 1, 1.025, 0.9])
  const packageRotate = useTransform(progress, [0, 0.22, 0.58, 0.82], [-3, 0, 1, -4])

  const phoneOpacity = useTransform(progress, [0, 0.07, 0.84, 0.97, 1], [0, 1, 1, 0.18, 0])
  const phoneX = useTransform(progress, [0, 0.16, 0.31, 0.46, 0.61, 0.84, 1], [72, -42, -88, -70, 18, 22, 72])
  const phoneY = useTransform(progress, [0, 0.16, 0.32, 0.46, 0.61, 0.84, 1], [120, 30, 8, -5, -14, 0, -180])
  const phoneRotateZ = useTransform(progress, [0, 0.18, 0.34, 0.48, 0.62, 0.88, 1], [7, -5, -3, -2, 0, 0, -3])
  const phoneScale = useTransform(progress, [0, 0.16, 0.32, 0.48, 0.62, 0.84, 1], [0.82, 0.9, 0.94, 0.96, 1, 1, 0.88])
  const phoneFilter = useTransform(progress, [0, 0.1, 0.84, 1], ['brightness(0.7) blur(5px)', 'brightness(1) blur(0px)', 'brightness(1) blur(0px)', 'brightness(0.16) blur(8px)'])

  const phoneTurn = useTransform(progress, [0, 0.14, 0.3, 0.43, 0.5, 0.62, 0.86, 1], [-24, -20, -7, -4, 22, 180, 180, 188])
  const scanOpacity = useTransform(progress, [0.12, 0.2, 0.38, 0.49], [0, 1, 1, 0])
  const productOpacity = useTransform(progress, [0.54, 0.64, 0.86, 0.97], [0, 1, 1, 0])
  const productScale = useTransform(progress, [0.54, 0.64, 0.86, 0.97], [0.96, 1, 1, 0.97])
  const productBlur = useTransform(progress, [0.54, 0.64, 0.88, 0.98], ['blur(9px)', 'blur(0px)', 'blur(0px)', 'blur(7px)'])
  const successOpacity = useTransform(progress, [0.34, 0.4, 0.47, 0.54], [0, 1, 1, 0])
  const screenOffOpacity = useTransform(progress, [0.84, 0.97], [0, 1])

  const phaseOneOpacity = useTransform(progress, [0, 0.08, 0.24, 0.34], [0.38, 1, 1, 0.38])
  const phaseTwoOpacity = useTransform(progress, [0.24, 0.34, 0.48, 0.58], [0.38, 1, 1, 0.38])
  const phaseThreeOpacity = useTransform(progress, [0.48, 0.58, 0.76, 0.86], [0.38, 1, 1, 0.38])
  const phaseFourOpacity = useTransform(progress, [0.72, 0.84, 0.94, 1], [0.38, 1, 1, 0.5])

  return (
    <section ref={sectionRef} className="qr-scenario" id="qr" aria-labelledby="qr-scenario-title">
      <div className="qr-scenario__sticky">
        <span className="qr-scenario__grid" aria-hidden="true" />
        <span className="qr-scenario__glow qr-scenario__glow--one" aria-hidden="true" />
        <span className="qr-scenario__glow qr-scenario__glow--two" aria-hidden="true" />

        <motion.header
          className="container qr-scenario__heading"
          style={reduceMotion ? undefined : { opacity: copyOpacity, y: copyY }}
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.75, ease }}
        >
          <span className="section-index">06 / 10</span>
          <span className="eyebrow"><i /> QR-сценарий</span>
          <h2 id="qr-scenario-title">Сканируешь блюдо.<br /><em>Видишь всё.</em></h2>
          <p>QR-код открывает состав, КБЖУ, цену и место блюда в твоём рационе.</p>
        </motion.header>

        <div className="qr-scenario__scene container">
          <motion.div
            className="qr-scenario__package-wrap"
            style={reduceMotion ? { opacity: 1 } : { opacity: packageOpacity, y: packageY, scale: packageScale, rotate: packageRotate }}
          >
            <PackageShowcase />
          </motion.div>

          <motion.div
            className="qr-scenario__phone"
            style={reduceMotion
              ? { opacity: 1, rotateZ: 0, scale: 1 }
              : { opacity: phoneOpacity, x: phoneX, y: phoneY, rotateZ: phoneRotateZ, scale: phoneScale, filter: phoneFilter }}
          >
            <motion.div className="qr-scenario__phone-rotator" style={reduceMotion ? { rotateY: 180 } : { rotateY: phoneTurn }}>
              <div className="qr-scenario__phone-face qr-scenario__phone-face--back">
                <PhoneBack scanOpacity={scanOpacity} successOpacity={successOpacity} reduceMotion={reduceMotion} />
              </div>
              <div className="qr-scenario__phone-face qr-scenario__phone-face--front">
                <div className="qr-scenario__phone-shell">
                  <span className="qr-scenario__dynamic-island" aria-hidden="true" />
                  <motion.div className="qr-scenario__screen qr-scenario__screen--product" style={reduceMotion ? { opacity: 1 } : { opacity: productOpacity, scale: productScale, filter: productBlur }}>
                    <ProductScreen />
                  </motion.div>
                  <motion.span className="qr-scenario__screen-off" style={reduceMotion ? { opacity: 0 } : { opacity: screenOffOpacity }} aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div className="qr-scenario__phases" style={reduceMotion ? undefined : { opacity: copyOpacity }} aria-label="Этапы QR-сценария">
          {[
            ['01', 'Упаковка с QR', phaseOneOpacity],
            ['02', 'Сканирование', phaseTwoOpacity],
            ['03', 'Карточка блюда', phaseThreeOpacity],
            ['04', 'В рацион', phaseFourOpacity],
          ].map(([number, label, opacity]) => (
            <motion.span key={String(number)} style={reduceMotion ? { opacity: 1 } : { opacity }}>
              <i>{String(number)}</i>{String(label)}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function MobileQrScenarioSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isVisible = useInView(sectionRef, { once: true, amount: 0.2, margin: '-8% 0px -8% 0px' })

  return (
    <section
      ref={sectionRef}
      className={`qr-mobile ${isVisible ? 'qr-mobile--visible' : ''}`}
      id="qr"
      aria-labelledby="qr-mobile-title"
    >
      <div className="container">
        <header className="qr-mobile__heading">
          <span className="section-index">06 / 10</span>
          <span className="eyebrow"><i /> QR-сценарий</span>
          <h2 id="qr-mobile-title">Сканируешь блюдо.<br /><em>Видишь всё.</em></h2>
          <p>QR-код открывает состав, КБЖУ, цену и место блюда в твоём рационе.</p>
        </header>

        <motion.div
          className="qr-mobile__package"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease }}
        >
          <PackageShowcase />
        </motion.div>

        <div className="qr-mobile__phone-stage" aria-label="Сканирование QR-кода и карточка блюда">
          <div className="qr-mobile__phone">
            <div className="qr-mobile__phone-face qr-mobile__phone-face--back">
              <img src={iphoneBackMobile} loading="lazy" decoding="async" alt="Задняя камера iPhone сканирует QR-код" />
              <span className="qr-mobile__sensor" aria-hidden="true" />
              <small><i /> QR найден</small>
            </div>
            <div className="qr-mobile__phone-face qr-mobile__phone-face--front">
              <div className="qr-scenario__phone-shell">
                <span className="qr-scenario__dynamic-island" aria-hidden="true" />
                <div className="qr-scenario__screen qr-scenario__screen--product">
                  <ProductScreen imageSrc={caesarFoodMobile} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="qr-mobile__steps" aria-label="Этапы QR-сценария">
          <span><i>01</i> Упаковка</span>
          <span><i>02</i> Сканирование</span>
          <span><i>03</i> Карточка блюда</span>
        </div>
      </div>
    </section>
  )
}

export function QrScenarioSection() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileQrScenarioSection /> : <DesktopQrScenarioSection />
}

export default QrScenarioSection
