import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import Version from '@components/Version';

import { useAppTheme } from '@theme/ThemeProvider';
import { styles } from './styles';

/**
 * Tela de Termos de Serviço e Política de Privacidade do aplicativo.
 */
export default function PrivacyTermsScreen() {
    const { colors } = useAppTheme();
    const navigation = useNavigation<RootNavigationProp>();

    return (
        <SafeAreaView
            edges={['top']}
            style={[
                styles.container,
                { backgroundColor: colors.background },
            ]}
        >
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.actions}
                    accessibilityRole="button"
                    accessibilityLabel="Voltar"
                >
                    <FontAwesome6
                        name="arrow-left"
                        size={20}
                        iconStyle="solid"
                        color={colors.textPrimary}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            
                {/* Termos de serviço */}
                <View style={styles.section}>
                    <Text
                        style={[
                            styles.title,
                            { color: colors.textPrimary },
                        ]}
                    >
                        Termos de serviço
                    </Text>

                    <Text
                        style={[
                            styles.description,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Estes termos estabelecem as regras para uso do aplicativo Vai
                        Abastecendo.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        1. Aceitação dos termos
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Ao acessar, criar uma conta ou utilizar o Vai Abastecendo, você
                        declara que leu, compreendeu e concorda com estes Termos de Serviço
                        e com a Política de Privacidade descrita nesta página.
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Caso não concorde com alguma condição, não utilize o aplicativo.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        2. Finalidade do aplicativo
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        O Vai Abastecendo é uma plataforma colaborativa para consulta de
                        postos de combustíveis, compartilhamento de preços e organização
                        pessoal de informações de abastecimento.
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        As informações de preços e postos podem ser provenientes de fontes
                        públicas, estabelecimentos ou contribuições de usuários. Esses
                        dados têm finalidade informativa e podem mudar a qualquer momento.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        3. Conta e responsabilidade do usuário
                    </Text>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.primary },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Você é responsável pelas atividades realizadas em sua conta.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.primary },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Você deve manter seus dados de acesso protegidos e não
                            compartilhá-los com terceiros.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.primary },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            O acesso por serviços externos, como Google, também está sujeito
                            aos termos e políticas desses fornecedores.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.primary },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Podemos restringir ou suspender contas em caso de fraude, abuso,
                            uso indevido ou violação destes termos.
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        4. Preços e dados dos postos
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Os preços exibidos possuem caráter colaborativo e informativo. Eles
                        podem estar desatualizados ou sofrer alterações sem aviso prévio
                        pelo estabelecimento.
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Antes de abastecer, confirme o preço, a disponibilidade, o tipo de
                        combustível e as condições comerciais diretamente no posto.
                    </Text>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.danger },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Não envie preços falsos, informações ofensivas ou conteúdo que
                            possa prejudicar usuários, postos ou terceiros.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.danger },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Contribuições suspeitas poderão ser ocultadas, revisadas ou
                            removidas.
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        5. Diário de abastecimento
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        O Diário de Abastecimento é um recurso de organização pessoal. Os
                        dados cadastrados, como veículo, placa opcional, odômetro, litros,
                        preços e datas, são utilizados para calcular e exibir seu histórico
                        de abastecimento.
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Enquanto não houver sincronização de diário em nuvem habilitada,
                        esses dados ficam armazenados localmente no seu dispositivo. Você é
                        responsável por guardar seus arquivos de backup em local seguro.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        6. Disponibilidade do serviço
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Podemos atualizar, modificar, suspender ou descontinuar
                        funcionalidades do aplicativo para correções, melhorias, segurança
                        ou evolução do serviço.
                    </Text>
                </View>

                {/* POLÍTICA DE PRIVACIDADE */}
                <View
                    style={[
                        styles.divider,
                        { backgroundColor: colors.border },
                    ]}
                />

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.title,
                            { color: colors.textPrimary },
                        ]}
                    >
                        Política de privacidade
                    </Text>

                    <Text
                        style={[
                            styles.description,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Esta política explica quais dados pessoais podem ser tratados, por
                        quais motivos e quais controles você possui sobre eles.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        1. Dados que podemos tratar
                    </Text>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.primary },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Dados de conta, como nome, e-mail e identificadores necessários
                            para autenticação.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.primary },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Dados de localização, como latitude e longitude, quando você
                            autoriza o acesso para localizar e ordenar postos próximos.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.primary },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Dados do diário, como veículo, placa opcional, capacidade do
                            tanque, abastecimentos, odômetro, litros e valores.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.primary },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Dados de interação, como preços enviados, reações e datas de
                            atualização.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.primary },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Dados técnicos mínimos necessários para estabilidade,
                            segurança, prevenção de abuso e diagnóstico de falhas.
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        2. Como usamos seus dados
                    </Text>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.success },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Autenticar sua conta e manter sua sessão ativa.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.success },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Localizar e ordenar postos por proximidade.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.success },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Registrar, calcular e exibir o histórico pessoal de
                            abastecimento.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.success },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Melhorar o aplicativo, prevenir fraude e proteger a segurança do
                            serviço.
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        3. Localização do dispositivo
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Usamos sua localização quando autorizada para mostrar postos
                        próximos e calcular a distância até eles. Você pode negar ou
                        revogar essa permissão nas configurações do seu dispositivo.
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Caso a localização não seja permitida, algumas funcionalidades
                        poderão continuar disponíveis, porém sem ordenação por proximidade.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        4. Compartilhamento de dados
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Podemos utilizar fornecedores de tecnologia para viabilizar recursos
                        do aplicativo. Esses fornecedores devem receber apenas os dados
                        necessários para executar seus serviços.
                    </Text>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.info },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Google, quando você optar por realizar autenticação usando sua
                            conta Google.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.info },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Mapbox, para recursos de mapas e cartografia.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.info },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Serviços de hospedagem e infraestrutura necessários para operar a
                            API e os recursos online do aplicativo.
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View
                            style={[
                                styles.bullet,
                                { backgroundColor: colors.info },
                            ]}
                        />
                        <Text
                            style={[
                                styles.text,
                                { color: colors.textSecondary },
                            ]}
                        >
                            Ferramentas de monitoramento técnico, usando somente informações
                            necessárias para diagnóstico de falhas e estabilidade.
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        5. Retenção e exclusão
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Mantemos dados de conta e dados online apenas pelo tempo necessário
                        para fornecer o serviço, cumprir obrigações legais, prevenir fraude,
                        resolver disputas ou proteger a segurança da plataforma.
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Dados armazenados localmente no Diário de Abastecimento podem ser
                        excluídos pelo próprio usuário ao remover veículos, abastecimentos
                        ou dados do aplicativo. Arquivos de backup exportados ficam sob
                        responsabilidade do usuário.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        6. Seus direitos
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Nos termos aplicáveis da legislação de proteção de dados, você pode
                        solicitar confirmação de tratamento, acesso, correção, informação
                        sobre compartilhamento, revogação de consentimento e eliminação de
                        dados quando cabível.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        7. Segurança
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Adotamos medidas técnicas e administrativas razoáveis para reduzir
                        riscos de acesso não autorizado, perda, alteração, divulgação ou
                        tratamento indevido de dados pessoais.
                    </Text>

                    <Text
                        style={[
                            styles.paragraph,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Nenhum sistema é totalmente imune a riscos. Por isso, recomendamos
                        proteger seu dispositivo, sua conta e seus arquivos de backup.
                    </Text>

                    <Text
                        style={[
                            styles.updated,
                            { color: colors.textSecondary },
                        ]}
                    >
                        Última atualização: 13 de agosto de 2026
                    </Text>
                </View>

                <Version />
            </ScrollView>
        </SafeAreaView>
    );
}